'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/shared/ui';

export default function NearbyHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">내 주변 맛집</h2>
        <p className="mt-1 text-sm text-gray-500">
          현재 위치 기준 가까운 맛집을 확인하세요
        </p>
      </div>
      <Button
        text="X"
        onClick={() => router.back()}
        variant="text"
        size="icon"
        className="text-gray-400 hover:bg-gray-100"
      />
    </div>
  );
}
