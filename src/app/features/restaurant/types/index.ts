export interface RestaurantData {
  id: string;
  name: string;
  location: string;
  category: string;
  phone: string;
  lat: number;
  lng: number;
  x?: number;
  y?: number;
}

export interface FormData {
  description: string;
  images: File[];
  tags: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
}

export interface UploadedImage {
  file: File;
  url?: string;
  uploading: boolean;
  error?: string;
  uploadId: string;
}
