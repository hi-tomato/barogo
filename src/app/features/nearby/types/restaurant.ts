import { BaropotItem } from "./baropot";

export interface RestaurantData {
  id: string;
  name: string;
  location: string;
  category: string;
  phone: string;
}

export interface RestaurantDetail {
  // 카카오 API 데이터 (기본 정보)
  kakaoId: string;
  name: string;
  address: string;
  phone: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };

  // 서버 확장 데이터
  id: number;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  openHours: string;
  baropots: BaropotItem[];
}
