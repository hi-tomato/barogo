export interface FavoriteRestaurant {
  id: number;
  name: string;
  address: string;
  rating?: number;
  reviews?: number;
  image?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
export interface NearbyRestaurant {
  id: string;
  place_name: string;
  address_name: string;
  phone: string;
  category_name: string;
  distance: string;
  place_url: string;
  road_address_name?: string;
  x?: string;
  y?: string;
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

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
