'use client';
import { useRouter } from 'next/navigation';

export default function MyPageHeader() {
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
          마이페이지
        </h1>
        <div className="w-10"></div>
      </div>
    </div>
  );
}
