export interface BaropotItem {
  id: number;
  title: string;
  restaurant: string;
  location: string;
  date: string;
  time: string;
  maxPeople: number;
  currentPeople: number;
  status: "recruiting" | "full" | "closed";
  host: string;
  tags: string[];
}

export interface FavoriteRestaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  image: string;
}

export interface NearbyRestaurant {
  id: string;
  place_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  distance: string;
  x: string; // 경도
  y: string; // 위도
}

export interface Position {
  lat: number;
  lng: number;
}

export interface GeolocationState {
  position: Position | null;
  loading: boolean;
  error: string | null;
}

// API 응답 타입들
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Query Key 타입들
export type BaropotTab = "ongoing" | "upcoming" | "my";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
