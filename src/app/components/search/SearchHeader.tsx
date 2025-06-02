"use client";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

export default function SearchHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
      <div className="flex items-center gap-3 px-4 py-3">
        <button className="p-1 cursor-pointer" onClick={() => router.back()}>
          <HiArrowLeft size={24} className="text-gray-700" />
        </button>
        <div className="flex-1">
          <input
            type="text"
            placeholder="위스키 페어링을 검색해보세요!"
            className="w-full px-4 py-3 bg-gray-100 rounded-full text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
