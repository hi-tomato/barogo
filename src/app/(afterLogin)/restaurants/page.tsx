"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RestaurantSelector from "@/app/features/baropot/components/create/RestaurantSelector";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";

export default function RestaurantsPage() {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantData | null>(null);

  const handleRestaurantSelect = (restaurant: RestaurantData | null) => {
    setSelectedRestaurant(restaurant);

    if (restaurant) {
      // 맛집이 선택되면 바로팟 생성 페이지로 이동
      // 서버에 등록된 맛집인지 확인하는 로직이 필요할 수 있음
      router.push(`/restaurants/${restaurant.id}/baropot/create`);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] pt-16 pb-24">
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
            바로팟 만들기
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 상단 배너 */}
        <div className="bg-gradient-to-r from-[#1C4E80] to-[#2563eb] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">⚡ 바로팟 만들기</h2>
              <p className="text-sm opacity-90">
                맛집을 선택하고 바로팟을 만들어보세요!
                <br />
                함께 식사할 친구를 찾아보세요.
              </p>
            </div>
            <div className="text-4xl">🍽️</div>
          </div>
        </div>

        {/* 맛집 선택 컴포넌트 */}
        <RestaurantSelector
          onRestaurantSelect={handleRestaurantSelect}
          selectedRestaurant={selectedRestaurant}
        />

        {/* 안내 메시지 */}
        {!selectedRestaurant && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center space-y-3">
              <div className="text-4xl">🎯</div>
              <h3 className="font-semibold text-[#2B2B2B]">
                맛집을 선택해주세요
              </h3>
              <p className="text-sm text-gray-600">
                위에서 맛집을 선택하면 바로팟을 만들 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
