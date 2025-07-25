/**
 * 참고 문서: https://kayuse88.github.io/haversine/
 * 🚨 KAKAO SDK에서 제공하는 라이브러리 Geometry를 사용하였지만, Next JS에서는 SSR로 동작하기 때문 렌더링이 안되는 현상을 발견
 * 🚨 - 서버에서 렌더링할 땐 window.kakao가 없지만 Client에서 hydration할 때는 있다. (불일치 현상 - Error)
 * ✅ 해당 기능 구현을 구현하기 위한 구글링중 "하버 사인" 공식을 인용하여 함수를 제작하였음.
 */
export const calculateHaversineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const EARTH_RADIUS_M = 6371e3; // 지구 반지름 (미터)

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const deltaLatRad = toRadians(lat2 - lat1);
  const deltaLngRad = toRadians(lng2 - lng1);

  const haversineA =
    Math.sin(deltaLatRad / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLngRad / 2) ** 2;

  const haversineC =
    2 * Math.atan2(Math.sqrt(haversineA), Math.sqrt(1 - haversineA));

  const distance = EARTH_RADIUS_M * haversineC;

  return distance;
};

export const formatDistance = (distance: number): string => {
  return distance >= 1000
    ? `${(distance / 1000).toFixed(1)}km`
    : `${Math.round(distance)}m`;
};
