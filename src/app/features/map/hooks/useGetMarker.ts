import { Restaurant } from "@/app/shared/types/map";

const baropotMarkerImage = {
  src: "https://cdn1.iconfinder.com/data/icons/camping-65/500/bonfire-256.png",
  size: { width: 34, height: 36 },
  options: { offset: { x: 24, y: 52 } },
};

const normalMarkerImage = {
  src: "https://cdn0.iconfinder.com/data/icons/social-reaction-and-emoji/519/like-256.png",
  size: { width: 28, height: 28 },
  options: { offset: { x: 20, y: 44 } },
};

// 마커 이미지 선택 함수
export const getMarkerImage = (restaurant: Restaurant) => {
  if (restaurant.hasBaropot) return baropotMarkerImage;
  return normalMarkerImage;
};

export const categories = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "카페",
  "술집",
] as const;
