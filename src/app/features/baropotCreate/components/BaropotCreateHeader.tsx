'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/shared/ui';

interface BaropotCreateHeaderProps {
  isCreating: boolean;
  onSubmit: () => void;
}

export default function BaropotCreateHeader({
  isCreating,
  onSubmit,
}: BaropotCreateHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex items-center px-4 py-3">
        <Button
          text="←"
          onClick={() => router.back()}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        />
        <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
          바로팟 만들기
        </h1>
        <Button
          text={isCreating ? '생성중...' : '완료'}
          onClick={onSubmit}
          disabled={isCreating}
          className="rounded-lg p-2 text-[#1C4E80] hover:bg-blue-50 disabled:opacity-50"
        />
      </div>
    </div>
  );
}
