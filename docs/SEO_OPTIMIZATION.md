# SEO 최적화 작업 가이드

## 📋 개요

Barogo 프로젝트의 SEO(Search Engine Optimization) 최적화 작업을 진행했습니다.

## 🎯 SEO 최적화가 필요한 주요 페이지

### 1. **맛집 상세 페이지** ✅ (완료)

- **경로**: `/restaurants/[restaurantId]`
- **이유**: 개별 맛집 정보를 보여주는 핵심 페이지
- **SEO 요소**: 맛집명, 주소, 메뉴, 리뷰 등의 구조화된 데이터

### 2. **메인 대시보드**

- **경로**: `main`
- **이유**: 로그인 후 사용자가 가장 많이 방문하는 페이지
- **SEO 요소**: 개인화된 콘텐츠, 카테고리별 맛집 탐색

### 3. **맛집 검색 페이지**

- **경로**: `/search`
- **이유**: 사용자가 특정 맛집을 찾을 때 사용하는 핵심 기능
- **SEO 요소**: 검색 결과 페이지 최적화, 필터링 옵션

### 4. **바로팟 상세 페이지**

- **경로**: `/baropot/[baropotId]`
- **이유**: 바로팟 모임의 상세 정보를 보여주는 페이지
- **SEO 요소**: 모임 제목, 설명, 조건 등의 메타데이터

### 5. **지도 페이지**

- **경로**: `/map`
- **이유**: 지도 기반 맛집 탐색 기능
- **SEO 요소**: 위치 기반 검색 최적화, 지도 마커 접근성

## 🔧 구현된 SEO 최적화 내용

### 맛집 상세 페이지 SEO 구현

#### 1. **서버 컴포넌트 구조로 변경**

```typescript
// 기존: 클라이언트 컴포넌트
'use client';
export default function RestaurantDetailPage() { ... }

// 변경: 서버 컴포넌트 + 클라이언트 컴포넌트 분리
export async function generateMetadata({ params }) { ... }
export default function RestaurantDetailPage({ params }) {
  return <RestaurantDetailClient restaurantId={params.restaurantId} />;
}
```

#### 2. **동적 메타데이터 생성**

```typescript
export async function generateMetadata({
  params,
}: {
  params: { restaurantId: string };
}): Promise<Metadata> {
  try {
    const restaurant = await restaurantService.getDetail(params.restaurantId);

    if (!restaurant) {
      return {
        title: '해당 맛집을 찾을 수 없습니다.',
        description: '요청하신 맛집을 찾을 수 없습니다.',
      };
    }

    return {
      title: `${restaurant.name} | Barogo`,
      description: `${restaurant.name} - ${restaurant.address}. ${restaurant.description || '맛있는 음식을 즐겨보세요!'}`,
      keywords: `${restaurant.name}, ${restaurant.category}, 맛집, ${restaurant.address}`,
      openGraph: {
        title: `${restaurant.name} | Barogo`,
        description:
          restaurant.description ||
          `${restaurant.name}에서 맛있는 음식을 즐겨보세요!`,
        images: restaurant.photos?.[0] ? [restaurant.photos[0]] : [],
      },
    };
  } catch (_: unknown) {
    return {
      title: '해당 맛집을 찾을 수 없습니다.',
      description: '요청하신 맛집을 찾을 수 없습니다.',
    };
  }
}
```

#### 3. **컴포넌트 구조 분리**

- **서버 컴포넌트**: `page.tsx` - 메타데이터 처리
- **클라이언트 컴포넌트**: `RestaurantDetailClient.tsx` - 인터랙티브 로직

## 🚀 SEO 최적화 효과

### 검색 엔진 최적화

- 동적 메타데이터로 검색 결과 개선
- Open Graph 태그로 소셜 미디어 공유 최적화
- 키워드 최적화로 검색 노출도 향상
