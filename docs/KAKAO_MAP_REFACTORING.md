# 🗺️ 카카오맵 리팩토링 과정

## 📋 개요

바로고 프로젝트에서 카카오맵 성능 최적화를 위한 리팩토링 과정을 정리한 문서입니다.

## 🎯 목표

- 초기 페이지 로딩 성능 개선 (LCP 최적화)
- 지도 타일 로딩 최적화
- 사용자 경험 향상
- 퍼포먼스 점수 개선

## 🔧 적용된 최적화 기법들

### 1. 지연 로딩 (Lazy Loading)

```typescript
// Intersection Observer를 사용한 지연 로딩
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (mapRef.current) {
    observer.observe(mapRef.current);
  }

  return () => observer.disconnect();
}, []);
```

**효과:**

- 초기 페이지 로딩 시 지도 타일 로딩 지연
- LCP (Largest Contentful Paint) 개선
- 불필요한 네트워크 요청 감소

### 2. 네트워크 최적화

```html
<!-- layout.tsx에 추가 -->
<link rel="preconnect" href="https://dapi.kakao.com" />
<link rel="dns-prefetch" href="https://dapi.kakao.com" />
```

**효과:**

- 카카오맵 도메인과의 연결 사전 설정
- DNS 조회 시간 단축
- 타일 로딩 속도 향상

### 3. CSS 성능 최적화

```css
/* globals.css에 추가 */
.map-container {
  content-visibility: auto;
  contain: layout style paint;
}

.kakao-map {
  will-change: transform;
  transform: translateZ(0);
}

.map-marker {
  contain: layout style paint;
  will-change: transform;
}
```

**효과:**

- 뷰포트 밖 요소의 렌더링 스킵
- GPU 가속 활용
- 메모리 사용량 최적화

### 4. 컴포넌트 메모이제이션

```typescript
// RestaurantMarker 최적화
function RestaurantMarker({ restaurant, onClick }: RestaurantMarkerProps) {
  const markerImage = getMarkerImage(restaurant);
  return (
    <MapMarker
      position={{ lat: restaurant.lat, lng: restaurant.lng }}
      onClick={onClick}
      image={markerImage}
      className="map-marker"
    />
  );
}

export default memo(RestaurantMarker);
```

**효과:**

- 불필요한 마커 재렌더링 방지
- 성능 향상
- 메모리 사용량 감소
