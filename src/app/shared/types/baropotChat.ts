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
