"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { useBaropotList } from "@/app/hooks/queries/useMockBaropot";
import BaropotTabs from "@/app/components/baropot/BaropotTabs";
import BaropotList from "@/app/components/baropot/BaropotList";
import { BaropotTab } from "@/app/types";

export default function BaropotMainPage() {
  const [activeTab, setActiveTab] = useState<BaropotTab>("ongoing");
  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useBaropotList(activeTab);
  const router = useRouter();

  const handleJoin = () => {
    // TODO: 바로팟을 입장했을 떄의 로직을 추가해야함.
    alert("참가하였습니다!");
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟
          </h1>
          <button
            onClick={() => router.push("/baropot/create")}
            className="p-2 text-[#1C4E80] hover:bg-blue-50 rounded-lg"
          >
            <HiPlus size={24} />
          </button>
        </div>
      </div>

      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-[#1C4E80] to-[#2563eb] mx-4 mt-4 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">⚡ 바로팟이란?</h2>
            <p className="text-sm opacity-90">
              혼자 가기 부담스러운 맛집,
              <br />
              지금 바로 함께할 사람을 찾아보세요!
            </p>
          </div>
          <div className="text-4xl">🍽️</div>
        </div>
      </div>

      <BaropotTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <BaropotList
        baropotList={baropotList}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
        onJoin={handleJoin}
      />

      {/* 플로팅 버튼 */}
      <button
        onClick={() => router.push("/baropot/create")}
        className="fixed bottom-24 right-4 bg-[#1C4E80] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-30"
      >
        <HiPlus size={24} />
      </button>
    </div>
  );
}
