import { Restaurant } from "../types/map";

// 마커 이미지 상수 정의
const selectedMarkerImage = {
  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
  size: { width: 64, height: 69 },
  options: { offset: { x: 32, y: 69 } },
};

const baropotMarkerImage = {
  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
  size: { width: 48, height: 52 },
  options: { offset: { x: 24, y: 52 } },
};

const normalMarkerImage = {
  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
  size: { width: 40, height: 44 },
  options: { offset: { x: 20, y: 44 } },
};

// 마커 이미지 선택 함수
export const getMarkerImage = (restaurant: Restaurant, isSelected: boolean) => {
  if (isSelected) return selectedMarkerImage;
  if (restaurant.hasBaropot) return baropotMarkerImage;
  return normalMarkerImage;
};

// 카테고리 상수
export const categories = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "카페",
  "술집",
];
