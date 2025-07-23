import { Restaurant } from '@/app/shared/types/restaurant';
import { RestaurantCategory } from '@/app/shared/types/enums';
import { getCategoryDisplayName } from '@/app/shared/lib/kakaoCategory';

const baropotMarkerImage = {
  src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 바로팟 메인 컬러와 어울리는 아이콘
  // src: 'https://cdn-icons-png.flaticon.com/512/7976/7976202.png', // 바로팟 전용 마커 (불 아이콘)
  size: { width: 32, height: 32 },
  options: { offset: { x: 16, y: 32 } },
};

const normalMarkerImage = {
  src: 'https://cdn-icons-png.flaticon.com/512/7976/7976202.png', // 파란색 위치 마커
  size: { width: 28, height: 28 },
  options: { offset: { x: 14, y: 28 } },
};

// 현재 위치 마커 이미지
export const userLocationMarkerImage = {
  src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 위치 아이콘
  size: { width: 32, height: 32 },
  options: { offset: { x: 16, y: 32 } },
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
