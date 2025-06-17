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
}
export type RestaurantList = Restaurant[];

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

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  rating: number;
  content: string;
  photos: string[];
}

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
