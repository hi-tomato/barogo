import { Restaurant } from '@/app/shared/types/restaurant';
import { RestaurantCategory } from '@/app/shared/types/enums';
import { getCategoryDisplayName } from '@/app/shared/lib/kakaoCategory';

const baropotMarkerImage = {
  src: '/images/markers/baropotMarker.webp',
  size: { width: 32, height: 32 },
  options: { offset: { x: 16, y: 32 } },
};

const normalMarkerImage = {
  src: '/images/markers/restaurantMarker.webp', // 파란색 위치 마커
  size: { width: 28, height: 28 },
  options: { offset: { x: 14, y: 28 } },
};

// 마커 이미지 선택 함수
export const getMarkerImage = (restaurant: Restaurant) => {
  if (restaurant.hasBaropot) return baropotMarkerImage;
  return normalMarkerImage;
};

export const categories = [
  '전체',
  ...Object.values(RestaurantCategory).map((category) =>
    getCategoryDisplayName(category)
  ),
] as const;
