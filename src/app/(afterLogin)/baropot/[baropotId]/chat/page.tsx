'use client';
import { Button, Header, Input } from '@/app/shared/ui';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function BaropotChatPage() {
  const [text, setText] = useState('');
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    if (!text.trim() || text.length === 0) return;
    if (text.trim().length > 1000) {
      // TODO: 토스트 띄우기
      // toast.error('메세지는 1000자 이하로 입력해주세요.');
      return;
    }
    // TODO: 메세지 전송 로직 구현
    e.preventDefault();

    console.log(text);
    setText('');
  };

  return (
    <div className="flex h-screen flex-col bg-[#f8fafc]">
      <Header title="은밀한 바로팟 채팅" showBack={false} />
      <div className="flex-1 overflow-y-auto">
        {/* 상대방 메시지 */}
        <div className="bg-black py-3">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />
                <div className="max-w-xs flex-1">
                  <div className="rounded-2xl rounded-bl-md bg-white px-4 py-2 text-black">
                    안녕하세요! 킹경문 먹으러 가요!
                  </div>
                  <div className="mt-1 text-sm text-gray-500">15:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 내가 보낸 메시지 */}
        <div className="bg-[#f8fafc]">
          {/* rounded */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-end gap-3">
                <div className="max-w-xs flex-1">
                  <div className="rounded-2xl rounded-br-md bg-[#1C4E80] px-4 py-2 text-white">
                    안녕하세요! 킹경문 먹으러 가요!
                  </div>
                  <div className="mt-1 text-right text-sm text-gray-500">
                    15:00
                  </div>
                </div>
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
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
        <Button type="submit" icon={<FiSend />} variant="primary" size="lg" />
      </form>
    </div>
  );
}
