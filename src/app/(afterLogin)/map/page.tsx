"use client";
import KaKaoContainer from "@/app/features/map/components/KaKaoContainer";
import { Header } from "@/app/shared/ui";

export default function KakaoMapView() {
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <Header title="지도" />
      <KaKaoContainer />
    </div>
  );
}
