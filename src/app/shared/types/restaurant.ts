export interface Restaurant {
  id: number;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
  photos: string[];
  tags: string[];
  reviewCount: number;
  isBookmarked: boolean;
  distance?: string;
}

export type RestaurantList = Restaurant[];

// 레스토랑 상세 정보 (리뷰 포함)
export interface RestaurantDetail {
  id: number;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
  photos: string[];
  restaurantToRestaurantTags: string[];
  isWrittenByMe: boolean;
  reviews: Review[];
  reviewCount: number;
  isBookmarked: boolean;
}

// 레스토랑 생성/수정
export interface CreateRestaurantRequest {
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
  tags: string[];
  photos: string[];
}
export interface SearchQueries {
  name?: string;
  category?: string;
  address?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}
export interface UpdateRestaurantRequest {
  name?: string;
  category?: string;
  address?: string;
  lat?: number;
  lng?: number;
  description?: string;
  phoneNumber?: string;
  openingTime?: string;
  closingTime?: string;
  lastOrderTime?: string;
  tags?: string[];
  photos?: string[];
}

// 리뷰 관련
export interface Review {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  content: string;
  photos: string[];
}

export interface ReviewResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  rating: number;
  content: string;
  photos: string[];
  userId: number;
  userName: string;
  userEmail: string;
  reviews?: [];
}

export interface CreateReviewResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  rating: number;
  content: string;
  photos: string[];
  userId: number;
  userName: string;
  userEmail: string;
}

export interface CreateReviewRequest {
  rating: number;
  content: string;
  photos: string[];
}

// API 파라미터 타입들
export interface CreateReviewParams {
  restaurantId: string;
  reviewData: CreateReviewRequest;
}

export interface DeleteReviewParams {
  reviewId: string;
  restaurantId: string;
}
