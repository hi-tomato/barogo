# API 클라이언트 리팩토링 가이드

## 📋 개요

API 클라이언트 구조를 함수 기반에서 클래스 기반으로 리팩토링하여 타입 안정성, 에러 처리, 코드 가독성을 개선하였음.

## 🔄 변경 사항

### Before (기존 구조)

```tsx
// 함수 기반 API 클라이언트
export const apiClient = axios.create({...});

export function post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
  return apiClient.post(url, data);
}

export function get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
  return apiClient.get<T>(url, config);
}

// 서비스에서 사용
export const restaurantService = {
  search: async (query?: SearchQueries) => {
    const { data } = await get<RestaurantList>("/restaurants");
    return data; // 매번 .data 접근 필요
  }
};
```

### After (새로운 구조)

```tsx
// 클래스 기반 API 클라이언트
export class BaseApiClient {
  private client: AxiosInstance;

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data; // 자동으로 data 추출
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }
}

// 서비스에서 사용
export class RestaurantService {
  async search(query?: SearchQueries): Promise<RestaurantList> {
    return await apiClient.get<RestaurantList>('/restaurants'); // 직접 데이터 반환
  }
}

// 싱글톤 인스턴스
export const restaurantService = new RestaurantService();
```

## 🚀 주요 개선사항

### 1. 타입 안정성 향상

- **기존**: `AxiosResponse<T>` 반환으로 매번 `.data` 접근 필요
- **개선**: `T` 직접 반환으로 타입 추론 개선

### 2. 일관된 에러 처리

```tsx
// 커스텀 ApiError 클래스 도입
export class ApiError extends Error {
  constructor(
    public status: number,
    public code?: string,
    message?: string
  ) {
    super(message || 'API 요청 실패');
    this.name = 'ApiError';
  }
}

// 사용 시
try {
  const data = await apiClient.get('/users');
} catch (error) {
  if (error instanceof ApiError) {
    console.log(`에러 코드: ${error.code}, 상태: ${error.status}`);
  }
}
```

### 3. 캡슐화 및 확장성

- 인스턴스 기반으로 여러 API 클라이언트 생성 가능
- 각각 다른 설정과 인터셉터 적용 가능

### 4. 응답 데이터 자동 추출

- 매번 `response.data` 처리 불필요
- 자동으로 데이터 추출하여 반환

## 📁 리팩토링된 파일들

### 1. API 클라이언트

- `src/app/shared/api/client.ts` - 새로운 BaseApiClient 클래스

### 2. 서비스 레이어

- `src/app/shared/services/restaurantService.ts` - 맛집 관련 API
- `src/app/shared/services/baropotService.ts` - 바로팟 관련 API
- `src/app/shared/services/authService.ts` - 인증 관련 API
- `src/app/shared/services/imageUploadService.ts` - 이미지 업로드 API
- `src/app/shared/services/notificationsServices.ts` - 알림 관련 API

## 🔧 사용법

### 기존 코드와의 호환성

기존 코드는 그대로 사용할 수 있습니다:

```tsx
// 기존과 동일하게 사용
import { restaurantService } from '@/app/shared/services/restaurantService';

const restaurants = await restaurantService.search();
const newRestaurant = await restaurantService.create(data);
```

## 📊 성능 개선

### 1. 번들 크기 최적화

- 불필요한 `response.data` 접근 제거
- 타입 추론 개선으로 런타임 오버헤드 감소

### 2. 메모리 사용량 개선

- 싱글톤 패턴으로 인스턴스 재사용
- 불필요한 객체 생성 방지

## 🔄 마이그레이션 가이드

### 1단계: 새로운 API 클라이언트 적용

```tsx
// 기존 import 제거
// import { get, post, patch, del } from '../api/client';

// 새로운 import 추가
import { apiClient } from '../api/client';
```

### 2단계: 서비스 메서드 리팩토링

```tsx
// 기존
const { data } = await get<RestaurantList>('/restaurants');
return data;

// 새로운 방식
return await apiClient.get<RestaurantList>('/restaurants');
```

### 3단계: 에러 처리 업데이트

```tsx
// 기존
if (axios.isAxiosError(error)) {
  // Axios 에러 처리
}

// 새로운 방식
if (error instanceof ApiError) {
  // 커스텀 에러 처리
}
```
