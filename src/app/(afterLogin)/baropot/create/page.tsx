"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RestaurantSelector from "@/app/features/baropot/components/create/RestaurantSelector";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";

export default function CreateBaropotPage() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getRestaurantData = () => {
      try {
        const saveData = sessionStorage.getItem("selectedRestaurant");
        if (saveData) {
          const restaurant: RestaurantData = JSON.parse(saveData);
          if (restaurant.name && restaurant.location && restaurant.category) {
            setSelectedRestaurant(restaurant);
            console.log("받은 맛집 데이터:", restaurant);
          } else {
            console.error("맛집 데이터가 불안전합니다");
            router.back();
          }

          sessionStorage.removeItem("selectedRestaurant");
        }
      } catch (error) {
        console.log("선택된 맛집이 없습니다.", error);
        router.back();
      }
    };

    getRestaurantData();
  }, [router]);

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
            새 바로팟 만들기
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <RestaurantSelector
          selectedRestaurant={selectedRestaurant}
          onRestaurantSelect={setSelectedRestaurant}
        />
      </div>
    </div>
  );
}
