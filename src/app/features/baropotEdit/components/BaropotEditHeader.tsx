'use client';
import { useRouter } from 'next/navigation';

export default function BaropotEditHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex items-center px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
          바로팟 수정
        </h1>
      </div>
    </div>
  );
}
