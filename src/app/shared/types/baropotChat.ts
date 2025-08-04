export interface JoinRoomRequest {
  baropotChatRoomId: number;
}

export interface JoinRoomResponse {
  success: boolean;
  message: string;
}

export interface LeaveRoomRequest {
  baropotChatRoomId: number;
}

export interface LeaveRoomResponse {
  success: boolean;
  message: string;
}

export interface SendMessageRequest {
  baropotChatRoomId: number;
  content: string;
}

export interface SendMessageResponse {
  success: boolean;
  messageId?: string;
  message?: string;
}

export interface MarkAsReadRequest {
  baropotChatRoomId: number;
}

export interface MarkAsReadResponse {
  success: boolean;
  message?: string;
}

export interface NewMessageEvent {
  messageId: string;
  baropotChatRoomId: number;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: Date;
}

export interface ReadMessageEvent {
  baropotChatRoomId: number;
  userId: number;
  timestamp: Date;
}

export interface CreateChatRoomRequest {
  baropotId: number;
  name: string;
}

export interface ChatRoomResponse {
  BaropotChatRoomId: number;
}

export interface GetChatRoomRequest {
  baropotChatRoomId: number;
}

export interface GetChatRoomResponse {
  id: number;
  createdAt: string;
  name: string;
  unreadCount: number;
  baropot: {
    id: number;
    title: string;
    maxParticipants: number;
    date: string;
    time: string;
  };
  participants: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: number | string;
  senderName?: string;
  timestamp: string;
  isMyMessage: boolean;
  baropotChatRoomId?: number;
}
