'use client';
import { Button, Header, Input } from '@/app/shared/ui';
import { useWebSocket } from '@/app/shared/hooks/socket/useWebSocket';
import { useState, use } from 'react';
import { FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { NewMessageEvent } from '@/app/shared/types/baropotChat';
import { useAuthStore } from '@/app/shared/store/useAuthStore';

interface ChatMessage {
  id: string | number;
  content: string;
  senderId: number;
  senderName?: string;
  timestamp: string;
  isMyMessage: boolean;
  baropotChatRoomId?: number;
}

export default function BaropotChatPage({
  params,
}: {
  params: Promise<{ chatRoomId: number }>;
}) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const user = useAuthStore((state) => state.user);
  const { chatRoomId } = use(params);
  const baropotChatRoomId = Number(chatRoomId);

  const { isConnected, error, leaveRoom, sendMessage } = useWebSocket({
    onNewMessageEvent: (response: NewMessageEvent) => {
      const chatMessage: ChatMessage = {
        id: response.messageId,
        content: response.content,
        senderId: response.senderId,
        timestamp: response.timestamp.toISOString(),
        isMyMessage: false,
        baropotChatRoomId: response.baropotChatRoomId,
      };
      setMessages((prev) => [...prev, chatMessage]);
    },
  });

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleSend 호출');
    if (!text.trim()) {
      console.log('조건 체크 실패:', { text: text.trim() }); // 디버깅 추가
      return;
    }

    if (text.trim().length > 1000) {
      console.log('메시지 길이 초과'); // 디버깅 추가
      return;
    }

    // TODO: 메세지 전송 로직 구현
    try {
      console.log('메시지 전송 시도:', { baropotChatRoomId, text }); // 디버깅용
      const data = await sendMessage(baropotChatRoomId, text);
      console.log('메시지 전송 성공, messageId:', data.messageId); // 디버깅용

      const newMessage: ChatMessage = {
        id: data.messageId || Date.now(),
        content: text,
        senderId: user?.id as number,
        timestamp: new Date().toISOString(),
        isMyMessage: true,
        baropotChatRoomId: baropotChatRoomId,
      };
      setMessages((prev) => [...prev, newMessage]);
      setText('');
    } catch (error) {
      // TODO: Error Toast
      console.error('메세지 전송 실패', error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(baropotChatRoomId);
      router.push('/baropot');
      //TODO: Toast
    } catch (error) {
      console.error('채팅방 퇴장 실패', error);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#f8fafc]">
      <Header
        title="은밀한 바로팟 채팅"
        showBack={true}
        onMenuClick={handleLeaveRoom}
      />

      {/* 디버깅 정보 */}
      <div className="bg-gray-100 p-2 text-xs">
        연결상태: {isConnected ? '연결됨' : '연결안됨'} | 채팅방ID:
        {baropotChatRoomId} | 메시지수: {messages.length}
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((message, idx) => (
          <div key={idx} className="p-4">
            <div
              className={`flex ${message.isMyMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 ${
                  message.isMyMessage
                    ? 'rounded-br-md bg-[#1C4E80] text-white'
                    : 'rounded-bl-md bg-white text-black'
                }`}
              >
                {message.content}
              </div>
            </div>
            <div
              className={`mt-1 text-xs text-gray-400 ${
                message.isMyMessage ? 'text-right' : 'text-left'
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      {/* FORM */}
      <form
        className="fixed right-0 bottom-20 left-0 flex items-center gap-2 p-4"
        onSubmit={handleSend}
      >
        <Input
          placeholder="메시지를 입력하세요"
          variant="outline"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button icon={<FiSend />} variant="primary" size="lg" />
        {!isConnected && (
          <div className="text-center text-red-500">채팅 서버에 연결 중...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}
      </form>
    </div>
  );
}
