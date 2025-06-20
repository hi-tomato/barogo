"use client";
import { useRouter } from "next/navigation";
import { HiSearch, HiBookmark, HiBell } from "react-icons/hi";

export default function MainHeader() {
  const router = useRouter();

  return (
    <header className="bg-white sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1C4E80] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-lg font-bold">B</span>
        </div>

        {/* 검색바 */}
        <div className="flex-1 relative">
          <div className="flex items-center bg-[#F5F5F5] rounded-full px-4 py-3 gap-2">
            <HiSearch className="text-[#8A8A8A]" size={20} />
            <input
              type="text"
              placeholder="무료 주차 맛집을 찾아보세요!"
              className="flex-1 bg-transparent text-sm placeholder:text-[#8A8A8A] focus:outline-none font-suit"
              onClick={() => router.push("/search")}
            />
          </div>
        </div>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-lg transition-colors">
            <HiBell size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
