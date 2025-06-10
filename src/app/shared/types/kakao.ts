export interface KakaoRestaurant {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  phone: string;
  place_url: string;
  distance?: string;
  x: string; // 경도
  y: string; // 위도
}

export interface KakaoSearchResponse {
  documents: KakaoRestaurant[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: string[];
      selected_region: string;
    };
    total_count: number;
  };
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
  category_name: string;
  distance: string;
  place_url: string;
}
