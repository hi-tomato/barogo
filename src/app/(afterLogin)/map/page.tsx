"use client";
import KaKaoContainer from "@/app/features/map/components/KaKaoContainer";
import { useRouter } from "next/navigation";

export default function KakaoMapView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 뒤로가기 헤더 등 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => router.back()}>←</button>
          <h1 className="flex-1 text-center text-lg font-semibold">지도</h1>
        </div>
      </div>

      <KaKaoContainer />
    </div>
  );
}
