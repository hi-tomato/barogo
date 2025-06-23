// Query Key 타입들
export type BaropotTab = "available" | "joined" | "created";

// TODO: 바로팟 참가인원
export interface Participant {
  userId: string;
  nickname: string;
  joinedAt: string; // 참가한 시간
}

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
  participants?: Participant[];
  host: string;
  tags: string[];
}

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
  contactMethod: "APP_CHAT" | "KAKAO_TALK" | "PHONE_NUMBER";
  restaurantAddress?: string;
  contactInfo?: string;
  expectedCost?: string;
  paymentMethod?: "DUTCH_PAY" | "HOST_PAYS" | "NEGOTIABLE";
  gender: string[];
  ageGroup: string[];
  tags: string[];
  description?: string;
  rules?: string;
}
