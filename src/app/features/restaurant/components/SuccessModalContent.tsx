import { Button } from '@/app/shared/ui';
import React from 'react';

interface SuccessModalContentProps {
  restaurantName: string;
  onCloseModal: () => void;
  onCreateBaropot: () => void;
}

export default function SuccessModalContent({
  restaurantName,
  onCloseModal,
  onCreateBaropot,
}: SuccessModalContentProps) {
  return (
    <div className="text-center">
      {/* 성공 아이콘 */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl">✅</span>
      </div>

      {/* 제목 */}
      <h2 className="mb-2 text-xl font-bold text-[#1C4E80]">맛집 등록 완료!</h2>

      {/* 메시지 */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#2B2B2B]">{restaurantName}</span>이
          성공적으로 등록되었습니다!
        </p>
        <p className="mt-2 text-sm text-gray-500">
          이제 바로팟을 만들어서 함께 식사할 친구를 찾아보세요.
        </p>
      </div>

      {/* 버튼들 */}
      <div className="space-y-3">
        <Button
          text="⚡ 바로팟 만들기"
          onClick={onCreateBaropot}
          className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-red-500 py-3 font-medium text-white transition-all hover:shadow-lg"
        />

        <Button
          text="메인으로 돌아가기"
          onClick={onCloseModal}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        />
      </div>
    </div>
  );
}
