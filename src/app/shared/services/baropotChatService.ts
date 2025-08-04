import { io, Socket } from 'socket.io-client';
import {
  JoinRoomResponse,
  LeaveRoomResponse,
  SendMessageRequest,
  SendMessageResponse,
  MarkAsReadResponse,
  NewMessageEvent,
  ReadMessageEvent,
  ChatRoomResponse,
  CreateChatRoomRequest,
  GetChatRoomResponse,
} from '@/app/shared/types/baropotChat';
import { BAROPOT_CHAT_EVENTS } from '@/app/shared/types/enums';
import { apiClient } from '../api/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/baropot-chat';
export class BaropotChatService {
  private socket: Socket | null = null;
  private isConnected = false;
  private checkConnection() {
    if (!this.socket) {
      throw new Error('채팅 서비스가 연결되지 않았습니다.');
    }
  }
  /** 바로팟 채팅방 개설 */
  async createChatRoom(
    request: CreateChatRoomRequest
  ): Promise<ChatRoomResponse> {
    return await apiClient.post<ChatRoomResponse>('/baropot-chat', request);
  }
  /** TODO: 사용자가 바로팟 채팅방을 전체 조회하는 API */
  async getChatRoomInfo(chatRoomId: number): Promise<GetChatRoomResponse> {
    return await apiClient.get<GetChatRoomResponse>(
      `/baropot-chat/${chatRoomId}`
    );
  }
  /** 바로팟 채팅 서비스 연결 */
  // TODO: 08.04 유저의 아이디를 보내기 (SenderId)
  async connect(token: string, senderId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(API_URL, {
        query: { token, senderId },
        transports: ['websocket'],
        forceNew: true,
        // TODO: 08.04 재연결 로직 추가
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });
      /** Socket Connection Success */
      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('채팅 서비스 연결 성공');
        resolve();
      });

      this.socket.on('reconnect', (attemptNumber: number) => {
        console.log(`채팅 서비스 재연결 성공 ${attemptNumber}번째`);
      });

      this.socket.on('reconnect_error', (attemptNumber: number) => {
        console.log(`채팅 서비스 재연결 실패 ${attemptNumber}번째`);
      });

      this.socket.on('reconnect_failed', () => {
        this.isConnected = false;
        console.log(`채팅 서비스 재연결 실패`);
      });

      /** Socket Connection Error */
      this.socket.on('connect_error', (err) => {
        this.isConnected = false;
        reject(err);
      });

      /** Socket Disconnect */
      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('연결이 끊김');
      });

      /** Socket Unauthorized (401) */
      this.socket.on('unauthorized', (err) => {
        this.isConnected = false;
        reject(err);
      });
    });
  }
  /** 바로팟 채팅방 입장 */
  async joinRoom(baropotChatRoomId: number): Promise<string> {
    this.checkConnection();

    return new Promise((resolve, reject) => {
      this.socket?.emit(
        BAROPOT_CHAT_EVENTS.JOIN_ROOM,
        { baropotChatRoomId },
        (response: JoinRoomResponse) => {
          console.log(response);
          if (response.success) {
            resolve(response.message);
          } else {
            reject(
              new Error(response.message || '채팅방 입장에 실패하였습니다.')
            );
          }
        }
      );
    });
  }
  /** 바로팟 채팅방 퇴장 */
  async leaveRoom(baropotChatRoomId: number): Promise<string> {
    this.checkConnection();
    return new Promise((resolve, reject) => {
      this.socket?.emit(
        BAROPOT_CHAT_EVENTS.LEAVE_ROOM,
        { baropotChatRoomId },
        (response: LeaveRoomResponse) => {
          if (response.success) {
            resolve(response.message);
          } else {
            reject(
              new Error(response.message || '채팅방 퇴장에 실패하였습니다.')
            );
          }
        }
      );
    });
  }
  /** 바로팟 채팅 메시지 전송 */
  async sendMessage({
    baropotChatRoomId,
    content,
  }: SendMessageRequest): Promise<string> {
    console.log('Socket emit SEND_MESSAGE 시도');
    this.checkConnection();
    return new Promise((resolve, reject) => {
      this.socket?.emit(
        BAROPOT_CHAT_EVENTS.SEND_MESSAGE,
        { baropotChatRoomId, content },
        (response: SendMessageResponse) => {
          console.log('SEND_MESSAGE 응답:', response);
          if (response.success) {
            resolve(response.messageId || '');
          } else {
            reject(
              new Error(response.message || '메시지 전송에 실패하였습니다.')
            );
          }
        }
      );
    });
  }
  /** 바로팟 채팅 메시지 읽음 처리 */
  async markAsRead(baropotChatRoomId: number): Promise<string> {
    this.checkConnection();

    return new Promise((resolve, reject) => {
      this.socket?.emit(
        BAROPOT_CHAT_EVENTS.MARK_AS_READ,
        { baropotChatRoomId },
        (response: MarkAsReadResponse) => {
          if (response.success) {
            resolve(response.message || '');
          } else {
            reject(
              new Error(response.message || '읽음 처리에 실패하였습니다.')
            );
          }
        }
      );
    });
  }

  /** 바로팟 채팅 서비스 연결 해제 */
  disconnect(): void {
    if (this.socket) {
      this.socket.offAny();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  /** 바로팟 채팅 새 메시지 수신 */
  onNewMessage(callback: (newMessage: NewMessageEvent) => void) {
    this.checkConnection();
    this.socket?.on(BAROPOT_CHAT_EVENTS.NEW_MESSAGE, callback);
  }
  /** 바로팟 채팅 메시지 수신 */
  onMessagesReceived(callback: (readMessages: ReadMessageEvent) => void) {
    this.checkConnection();
    this.socket?.on(BAROPOT_CHAT_EVENTS.MESSAGES_READ, callback);
  }
}

export const baropotChatService = new BaropotChatService();
