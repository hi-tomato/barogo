export interface BaropotSendTypes {
  // TODO: 바로팟을 생성할 때, 서버에 보낼 필드값들 (수정할 수 있음.)
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
  isMyBaropot: boolean;
  isUrgent: boolean;

  // TODO:선택적 필드 (수정할 수 있음)
  description?: string;
  expectedCost?: string;
  paymentMethod?: "dutch" | "host" | "discuss";
  contactMethod?: "app" | "kakao" | "phone";
  contactInfo?: string;
  rules?: string;
  gender?: string[];
  ageGroup?: string[];
  restaurantAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Baropot {
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
  isMyBaropot: boolean;
  isUrgent: boolean;
}

// Baropot Status
export type BaropotStatus = "recruiting" | "full" | "closed";

export interface BaropotFormData {
  title: string;
  restaurant: string;
  meetingLocation: string;
  date: string;
  time: string;
  maxPeople: string;
  contactMethod: "app" | "kakao" | "phone";
  restaurantAddress?: string;
  contactInfo?: string;
  expectedCost?: string;
  paymentMethod?: "dutch" | "host" | "discuss";
  gender: string[];
  ageGroup: string[];
  tags: string[];
  description?: string;
  rules?: string;
}
