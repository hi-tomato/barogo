'use client';

import { Button } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';

export default function PopularModalHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900">찜한 맛집</h2>
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
