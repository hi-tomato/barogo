# 카테고리 시스템 리팩토링

## 🎯 목표

- 카테고리 데이터 일관성 확보
- 타입 안정성 향상
- 유지보수성 개선
- 불필요한 코드 제거

## 🔄 변경사항

### 1. Enum 기반 카테고리 시스템 도입

#### Before (하드코딩)

```typescript
// 여러 파일에 분산된 하드코딩된 카테고리
const categories = ["한식", "중식", "일식", "양식", "카페", "술집"];

const categoryMap = {
  KOREAN: "한식",
  CHINESE: "중식",
  // ...
};
```

#### After (Enum 기반)

```typescript
// enums.ts - 단일 진실 공급원
export enum RestaurantCategory {
  KOREAN = "KOREAN",
  JAPANESE = "JAPANESE",
  CHINESE = "CHINESE",
  // ...
}

// kakaoCategory.ts - 유틸리티 함수들
export const restaurantCategoryKorean = {
  [RestaurantCategory.KOREAN]: "한식",
  [RestaurantCategory.JAPANESE]: "일식",
  // ...
};

export const VALID_CATEGORIES = Object.values(RestaurantCategory);
```

### 2. 불필요한 함수 제거

#### 제거된 함수

- `mapKaKaoCategoryToServer()` - 카카오 API 카테고리를 enum으로 변환하는 함수
- 하드코딩된 카테고리 매핑 로직

#### 제거 이유

- 사용자가 직접 카테고리를 선택하도록 변경
- 카카오 API는 참고용으로만 사용
- 데이터 일관성 확보

### 3. 파일별 변경사항

#### `src/app/shared/lib/kakaoCategory.ts`

- 180줄 → 27줄로 대폭 축소
- `mapKaKaoCategoryToServer` 함수 완전 제거
- enum 기반 유틸리티 함수들로 정리

#### `src/app/features/restaurant/components/CreatedeScription.tsx`

- 라디오 버튼 → Select 드롭다운으로 변경
- enum 기반 카테고리 선택 구현

#### `src/app/features/restaurant/components/CreateContainer.tsx`

- 사용자 선택 카테고리를 서버로 전송
- 카테고리 선택 validation 추가

#### `src/app/features/search/components/RestaurantPreviewModal.tsx`

- `mapKaKaoCategoryToServer` 사용 제거
- 카테고리를 빈 값으로 설정하여 사용자 선택 유도

#### `src/app/features/map/hooks/useGetMarker.ts`

- 하드코딩된 categories 배열을 enum 기반으로 변경

#### `src/app/features/nearby/utils/categoryHelpers.ts`

- 하드코딩된 카테고리 매칭을 enum 기반으로 개선

## ✅ 개선 효과

### 1. 데이터 일관성

- 서버에 저장되는 모든 카테고리가 유효한 enum 값
- 바로팟 조회 시 400 에러 방지

### 2. 타입 안정성

- TypeScript가 자동으로 타입 체크
- 잘못된 카테고리 값 사용 방지

### 3. 유지보수성

- enum 수정 시 모든 관련 코드 자동 반영
- 단일 진실 공급원으로 관리 복잡도 감소

### 4. 코드 간소화

- 180줄의 복잡한 변환 로직 → 27줄의 깔끔한 코드
- 중복 코드 제거

## 🔧 사용법

### 카테고리 선택 컴포넌트

```typescript
import { RestaurantCategory } from "@/app/shared/types/enums";
import { getCategoryDisplayName } from "@/app/shared/lib/kakaoCategory";

<select value={category} onChange={handleChange}>
  <option value="">카테고리를 선택해주세요</option>
  {Object.values(RestaurantCategory).map((category) => (
    <option key={category} value={category}>
      {getCategoryDisplayName(category)}
    </option>
  ))}
</select>;
```

### 카테고리 표시

```typescript
import { getCategoryDisplayName } from "@/app/shared/lib/kakaoCategory";

const displayName = getCategoryDisplayName("KOREAN"); // "한식"
```

### 유효성 검증

```typescript
import { isValidCategory } from "@/app/shared/lib/kakaoCategory";

const isValid = isValidCategory("KOREAN"); // true
```

## 🚀 향후 개선 방향

1. **다국어 지원**: `restaurantCategoryEnglish` 등 추가
2. **카테고리별 아이콘**: enum 기반 아이콘 매핑 시스템
3. **카테고리 필터링**: enum 기반 필터링 로직 통일

## 📝 관련 이슈

- [ ] 카테고리 시스템 리팩토링 완료
- [ ] 테스트 코드 업데이트
- [ ] 문서화 완료
