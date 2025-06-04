"use client";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { useMockNearby } from "@/app/hooks/queries/useMockNearby";
import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/hooks/useCategory";
import { NearbyRestaurant } from "@/app/types";
import { useEffect } from "react";
import { useLocationStore } from "@/app/store/useUserLocation";
import { useBaropotStore } from "@/app/store/useBaropotStore";

export default function NearbyModal() {
  const router = useRouter();
  const { saveLocationFromGeolocation } = useLocationStore();
  const { setSelectedRestaurant } = useBaropotStore();
  // 현재 위치를 받아오는 Hooks
  const {
    location,
    error: locationError,
    isLoading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();

  useEffect(() => {
    if (location) {
      saveLocationFromGeolocation(location);
    }
  }, [location, saveLocationFromGeolocation]);

  const {
    data: restaurants = [],
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useMockNearby(location);

  const isLoading = locationLoading || restaurantsLoading;
  const error = locationError || restaurantsError?.message;

  const handleCreateBaropot = (restaurant: NearbyRestaurant) => {
    setSelectedRestaurant(restaurant);

    sessionStorage.setItem(
      "selectedRestaurant",
      JSON.stringify({
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || "",
      })
    );
    window.location.href = `/baropot/create/${restaurant.id}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0000004c] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              내 주변 맛집
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              현재 위치 기준 가까운 맛집을 확인하세요
            </p>
          </div>
          <Button
            text="✕"
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          />
        </div>

        {/* 컨텐츠 */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {!location && (
            <div className="text-center py-8">
              <button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {locationLoading ? "위치 찾는 중..." : "현재 위치 찾기"}
              </button>
            </div>
          )}

          {locationError && (
            <div className="text-center py-8 text-red-500">{locationError}</div>
          )}

          {isLoading && location && (
            <div className="text-center py-8 text-gray-500">
              맛집을 찾는 중...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}

          {location && !isLoading && restaurants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              주변에 맛집이 없습니다
            </div>
          )}

          {restaurants.length > 0 && (
            <div className="space-y-3">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    {/* 카테고리 아이콘 */}
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                        restaurant.category_name
                      )} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-lg">
                        {getCategoryIcon(restaurant.category_name)}
                      </span>
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {restaurant.place_name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {restaurant.category_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {restaurant.address_name}
                      </p>
                      {restaurant.distance && (
                        <p className="text-xs text-blue-600 mt-1">
                          📍 {Math.round(Number(restaurant.distance))}m
                        </p>
                      )}
                      {restaurant.phone && (
                        <p className="text-xs text-gray-500">
                          📞 {restaurant.phone}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleCreateBaropot(restaurant)}
                      className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-xs font-medium hover:shadow-md transition-all cursor-pointer"
                    >
                      ⚡ 바로팟 만들기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
