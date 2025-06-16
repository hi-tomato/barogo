export interface RestaurantData {
  id: string;
  name: string;
  location: string;
  category: string;
  phone: string;
  lat?: string;
  lng?: string;
}

export interface FormData {
  description: string;
  images: File[];
  tags: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
}
