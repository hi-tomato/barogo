"use client";
import { NearbyRestaurant } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/ui/Button";
import {
  useCreateRestaurant,
  useRestaurantDetail,
} from "@/app/shared/hooks/queries/useRestaurant";

interface RestaurantPreviewModalProps {
  restaurant: NearbyRestaurant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantPreviewModal({
  restaurant,
  isOpen,
  onClose,
  onConfirm,
}: RestaurantPreviewModalProps) {
  const router = useRouter();
  const createRestaurant = useCreateRestaurant();
  const {
    data: restaurantDetail,
    isLoading,
    isError,
  } = useRestaurantDetail(restaurant.id);

  // 서버에 데이터가 있는지 확인
  const hasServerData = restaurantDetail && !isError;

  // 상세보기 버튼 클릭
  const handleDetailView = () => {
    onClose();
  };

  // 맛집 등록 버튼 클릭
  const handleRegisterRestaurant = async () => {
    if (!restaurant.x || !restaurant.y) {
      alert("위치 정보가 없어서 맛집을 등록할 수 없습니다.");
      return;
    }
    sessionStorage.setItem(
      "selectedRestaurant",
      JSON.stringify({
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || "",
        x: restaurant.x,
        y: restaurant.y,
      })
    );
    router.push(`/restaurants/create`);
  };

  // 바로팟 만들기 버튼 클릭
  const handleCreateBaropot = () => {
    console.log("바로팟 만들기로 이동");
    onConfirm(restaurant);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">맛집 정보</h3>
          <Button
            text="✕"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          />
        </div>

        {/* 맛집 정보 */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-lg">{restaurant.place_name}</h4>
          <p className="text-sm text-gray-600">{restaurant.category_name}</p>
          <p className="text-sm text-gray-600">📍 {restaurant.address_name}</p>
          {restaurant.road_address_name && (
            <p className="text-sm text-gray-500">
              🛣️ {restaurant.road_address_name}
            </p>
          )}
          {restaurant.phone && (
            <p className="text-sm text-gray-600">📞 {restaurant.phone}</p>
          )}
          {restaurant.distance && (
            <p className="text-sm text-green-600">
              📏 현재 위치에서 약 {Math.round(parseInt(restaurant.distance))}m
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* 상단: 상세보기 버튼 (서버에 데이터가 있을 때만) */}
          {hasServerData && (
            <button
              onClick={handleDetailView}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>🔍</span>
              <span>맛집 상세보기</span>
            </button>
          )}

          {/* 하단: 맛집 등록 + 바로팟 만들기 버튼들 */}
          <div className="flex space-x-3">
            {/* 맛집 등록 버튼 (서버에 데이터가 없을 때만) */}
            {!hasServerData && !isLoading && (
              <button
                onClick={handleRegisterRestaurant}
                disabled={createRestaurant.isPending}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>📝</span>
                <span>
                  {createRestaurant.isPending ? "등록 중..." : "맛집 등록"}
                </span>
              </button>
            )}

            {/* 바로팟 만들기 버튼 */}
            <button
              onClick={handleCreateBaropot}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>⚡</span>
              <span>바로팟 만들기</span>
            </button>
          </div>

          {/* 다시 선택 버튼 */}
          <Button
            text="다시 선택"
            onClick={onClose}
            className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
