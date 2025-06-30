import {
  BaropotJoinedStatus,
  ParticipantAgeGroup,
  ParticipantGender,
  RestaurantCategory,
  ContactMethod,
  PaymentMethod,
  BaropotStatus,
} from "./enums";

export interface BaropotsQueries {
  statusList: BaropotJoinedStatus;
  title: string;
  tags: string;
  participantGenderList: ParticipantGender;
  participantAgeGroupList: ParticipantAgeGroup;
  restaurantName: string;
  restaurantCategory: RestaurantCategory;
  address: string;
  lat: number;
  lng: number;
  radius: number;
}

export interface CreateBaropotRequest {
  restaurantId: number;
  title: string;
  location: string;
  maxParticipants: number;
  date: string;
  time: string;
  participantGender?: ParticipantGender;
  participantAgeGroup?: ParticipantAgeGroup;
  contactMethod?: ContactMethod;
  estimatedCostPerPerson?: number;
  paymentMethod?: PaymentMethod;
  description: string;
  rule?: string;
  tags: string[];
}

export interface Restaurant {
  id: number;
  name: string;
  category: RestaurantCategory;
  address: string;
  lat: string;
  lng: string;
  description: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
}

export interface Host {
  name: string;
  userId: number;
}

export interface Participant {
  userId: number;
  name: string;
  isHost: boolean;
  joinedStatus: BaropotJoinedStatus;
  hostMemo?: string;
}

export interface BaropotListResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  status: BaropotStatus;
  location: string;
  maxParticipants: number;
  date: string;
  time: string;
  participantGender: ParticipantGender;
  participantAgeGroup: ParticipantAgeGroup;
  contactMethod?: ContactMethod;
  estimatedCostPerPerson?: number;
  paymentMethod: PaymentMethod;
  description: string;
  rule?: string;
  tags: string[];
  restaurant: Restaurant;
  host: Host;
  participantCount: number;
  pendingParticipantCount: number;
  participants: Participant[];
}

export interface JoinBaropotRequest {
  joinMessage: string;
}

/** 200OK : BaropotDetailResponse */
export interface BaropotDetailResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  status: BaropotStatus;
  location: string;
  maxParticipants: number;
  date: string;
  time: string;
  participantGender: ParticipantGender;
  participantAgeGroup: ParticipantAgeGroup;
  contactMethod: ContactMethod;
  estimatedCostPerPerson: number;
  paymentMethod: PaymentMethod;
  description: string;
  rule: string;
  tags: string[];
  restaurant: Restaurant;
  host: Host;
  participantCount: number;
  pendingParticipantCount: number;
  participants: Participant[];
}

/** 200OK : BaropotEditRequest */
export interface BaropotEditRequest {
  title: string;
  location: string;
  maxParticipants: number;
  date: string;
  time: string;
  participantGender: ParticipantGender;
  participantAgeGroup: ParticipantAgeGroup;
  contactMethod: ContactMethod;
  estimatedCostPerPerson: number;
  paymentMethod: PaymentMethod;
  description: string;
  rule: string;
  tags: string[];
}

/** (Host): 참가자 요청 처리 */
export interface ManageParticipantRequest {
  participantUserId: number;
  joinedStatus: BaropotJoinedStatus;
  hostMemo: string;
}

/**(Host): 바로팟 상태 변경 */
export interface UpdateBaropotStatusRequest {
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}
