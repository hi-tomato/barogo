import { useState, useEffect, useRef, useCallback } from 'react';
import { BaropotChatService } from '@/app/shared/services/baropotChatService';
import {
  NewMessageEvent,
  ReadMessageEvent,
} from '@/app/shared/types/baropotChat';
import { useAuthStore } from '../../store/useAuthStore';
import { getAccessToken } from '../../lib/authToken';

interface WebSocketConfig {
  onNewMessageEvent?: (message: NewMessageEvent) => void;
  onMessagesReadEvent?: (data: ReadMessageEvent) => void;
}

export const useWebSocket = ({
  onNewMessageEvent,
  onMessagesReadEvent,
}: WebSocketConfig) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatServiceRef = useRef<BaropotChatService | null>(null);
  const isConnectedRef = useRef(false);
  const onNewMessageRef = useRef(onNewMessageEvent);
  const onMessageReadRef = useRef(onMessagesReadEvent);

  const user = useAuthStore((state) => state.user);
  const senderId = user?.id;
  const token = getAccessToken();

  console.log('senderId', user?.id);

  useEffect(() => {
    onNewMessageRef.current = onNewMessageEvent;
    onMessageReadRef.current = onMessagesReadEvent;
  });

  /** 바로팟 채팅 Connection 연결 */
  useEffect(
    function connectWebSocket() {
      if (!token || !senderId) {
        console.log('토큰 또는 senderId가 없음:', { token: !!token, senderId });
        return;
      }

      if (!chatServiceRef.current) {
        chatServiceRef.current = new BaropotChatService();
      }

      const services = chatServiceRef.current;

      const attachConnection = async () => {
        try {
          await services.connect(token || '', senderId);
          setIsConnected(true);
          setError(null);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : '채팅 연결에 실패하였습니다.'
          );
        }
      };

      attachConnection();

      services.onNewMessage((message) => {
        onNewMessageRef.current?.(message);
      });

      services.onMessagesReceived((data) => {
        onMessageReadRef.current?.(data);
      });

      // Clean up
      return () => {
        if (services) {
          services.disconnect();
        }
      };
    },
    [token, senderId]
  );

  const joinRoom = useCallback(
    async (baropotChatRoomId: number) => {
      if (!chatServiceRef.current || !isConnected) {
        throw new Error('채팅 서비스가 연결되지 않았습니다.');
      }
      const message = await chatServiceRef.current.joinRoom(baropotChatRoomId);
      console.log('바로팟 채팅방 입장 성공', message);
      return message;
    },
    [isConnected]
  );

  const leaveRoom = useCallback(
    async (baropotChatRoomId: number) => {
      if (!chatServiceRef.current || !isConnected) {
        throw new Error('채팅 서비스가 연결되지 않았습니다.');
      }
      const message = await chatServiceRef.current.leaveRoom(baropotChatRoomId);
      console.log('바로팟 채팅방 퇴장 성공', message);
      return message;
    },
    [isConnected]
  );

  const sendMessage = useCallback(
    async (baropotChatRoomId: number, content: string) => {
      if (!chatServiceRef.current || !isConnected) {
        throw new Error('채팅 서비스가 연결되지 않았습니다.');
      }
      const message = await chatServiceRef.current.sendMessage({
        baropotChatRoomId,
        content,
      });
      console.log('바로팟 채팅 메세지 전송 성공', message);
      return message;
    },
    [isConnected]
  );

  const markAsRead = useCallback(
    async (baropotChatRoomId: number) => {
      if (!chatServiceRef.current || !isConnected) {
        throw new Error('채팅 서비스가 연결되지 않았습니다.');
      }
      const message =
        await chatServiceRef.current.markAsRead(baropotChatRoomId);
      console.log('읽음 처리 성공', message);
      return message;
    },
    [isConnected]
  );

  return {
    isConnected,
    error,
    joinRoom,
    leaveRoom,
    sendMessage,
    markAsRead,
  };
};
