import { NearbyRestaurant } from "@/app/types";
import React from "react";

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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">맛집 정보</h3>
          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        {/* 맛집 정보 */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-lg">{restaurant.place_name}</h4>
          <p className="text-sm text-gray-600">{restaurant.category_name}</p>
          <p className="text-sm text-gray-600">📍 {restaurant.address_name}</p>
          {restaurant.phone && (
            <p className="text-sm text-gray-600">📞 {restaurant.phone}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
          >
            다시 선택
          </button>
          <button
            onClick={() => onConfirm(restaurant)}
            className="flex-1 px-4 py-3 bg-[#1C4E80] text-white rounded-lg"
          >
            이 맛집으로 결정
          </button>
        </div>
      </div>
    </div>
  );
}
