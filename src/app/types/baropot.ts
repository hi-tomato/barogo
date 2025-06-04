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
