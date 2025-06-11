"use client";
import { useRestaurantDetail } from "@/app/hooks/queries/useRestaurantDetail";
import { NearbyRestaurant } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import { getActionButton, getActionButtonIcon } from "../util/getActions";
import Button from "@/app/shared/ui/Button";

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
  const {
    data: restaurantDetail,
    isLoading,
    isError,
  } = useRestaurantDetail(restaurant.id, isOpen);
  const modalState = { isLoading, isError, restaurantDetail };

  const handleActions = () => {
    // TODO: 서버에 등록된 데이터가 있을 때,
    if (restaurantDetail && !isError) {
      console.log(`서버에 데이터가 있습니다! 디테일 페이지로 이동함둥`);
      onClose();
      router.push(`/search/${restaurant.id}/detail`);
    } else {
      // TODO: 서버에 등록된 데이터가 없을 때.
      console.log(
        `서버에 등록된 데이터가 없습니다. 바로팟 만들기 페이지로 이동합니다.`
      );
      onConfirm(restaurant);
    }
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

        {/* Action Buttons (서버에 데이터가 있는지 없는지 확인하는 btns) */}
        <div className="flex space-x-3">
          <Button
            text="다시 선택"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          />
          <button
            onClick={handleActions}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{getActionButton(modalState)}</span>
            <span>{getActionButtonIcon(modalState)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
