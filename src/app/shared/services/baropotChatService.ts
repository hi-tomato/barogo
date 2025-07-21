import { io, Socket } from 'socket.io-client';
import {
  JoinRoomResponse,
  LeaveRoomResponse,
  SendMessageRequest,
  SendMessageResponse,
  MarkAsReadResponse,
  NewMessageEvent,
  ReadMessageEvent,
} from '@/app/shared/types/baropotChat';

export class BaropotChatService {
  private socket: Socket | null = null;
  private isConnected = false;
  private checkConnection() {
    if (!this.socket) {
      throw new Error('채팅 서비스가 연결되지 않았습니다.');
    }
  }
  /** 바로팟 채팅 서비스 연결 */
  async connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io('/baropot-chat', {
        extraHeaders: { token },
      });
      /** Socket Connection Success */
      this.socket.on('connect', () => {
        this.isConnected = true;
        resolve();
      });

      /** Socket Connection Error */
      this.socket.on('connect_error', (err) => {
        this.isConnected = false;
        reject(err);
      });

      /** Socket Disconnect */
      this.socket.on('disconnect', () => {
        this.isConnected = false;
        reject(new Error('연결이 끊어졌습니다.'));
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
        'JOIN_ROOM',
        { baropotChatRoomId },
        (response: JoinRoomResponse) => {
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
        'LEAVE_ROOM',
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
    this.checkConnection();
    return new Promise((resolve, reject) => {
      this.socket?.emit(
        'SEND_MESSAGE',
        { baropotChatRoomId, content },
        (response: SendMessageResponse) => {
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
        'MARK_AS_READ',
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
  /** 바로팟 채팅 새 메시지 수신 */
  onNewMessage(callback: (newMessage: NewMessageEvent) => void) {
    this.checkConnection();
    this.socket?.on('NEW_MESSAGE', callback);
  }
  /** 바로팟 채팅 메시지 수신 */
  onMessagesReceived(callback: (readMessages: ReadMessageEvent) => void) {
    this.checkConnection();
    this.socket?.on('MESSAGES_READ', callback);
  }
}
