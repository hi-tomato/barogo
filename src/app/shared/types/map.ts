export interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  category: string;
  hasBaropot: boolean;
  baropotCount: number;
  rating: number;
  reviewCount: number;
}
