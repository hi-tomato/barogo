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
