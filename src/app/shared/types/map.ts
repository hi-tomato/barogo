export interface Restaurant {
  id: string;
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
