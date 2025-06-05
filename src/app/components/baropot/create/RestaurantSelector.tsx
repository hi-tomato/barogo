"use client";
import { useState } from "react";
import { RestaurantData } from "@/app/types/restaurant";
import FavoriteRestaurantModal from "./modal/FavoriteRestaurantModal";
import SearchRestaurantModal from "./modal/SearchRestaurantModal";
import NearbyRestaurantModal from "./modal/NearbyRestaurantModal";

interface RestaurantSelectorProps {
  onRestaurantSelect: (restaurant: RestaurantData | null) => void;
  selectedRestaurant?: RestaurantData | null;
}

export default function RestaurantSelector({
  onRestaurantSelect,
  selectedRestaurant,
}: RestaurantSelectorProps) {
  const [showNearbyModal, setShowNearbyModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  // 맛집이 선택된 경우
  if (selectedRestaurant) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-semibold text-[#2B2B2B]">🍽️ 선택된 맛집</h2>
          <button
            onClick={() => onRestaurantSelect(null)} // 선택 해제
            className="text-sm text-blue-600 hover:underline"
          >
            변경하기
          </button>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-orange-600">🎯</span>
            <h3 className="font-semibold text-orange-800">선택된 맛집</h3>
          </div>
          <h3 className="font-medium text-gray-900">
            {selectedRestaurant.name}
          </h3>
          <p className="text-sm text-gray-600">{selectedRestaurant.location}</p>
          <p className="text-xs text-gray-500">{selectedRestaurant.category}</p>
          {selectedRestaurant.phone && (
            <p className="text-xs text-gray-500">
              📞 {selectedRestaurant.phone}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 맛집 선택 옵션들
  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
          🍽️ 맛집 선택
        </h2>

        <div className="space-y-3">
          {/* 내 주변 맛집 */}
          <button
            onClick={() => setShowNearbyModal(true)}
            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <div className="text-left flex-1">
                <h3 className="font-medium text-gray-900">내 주변 맛집</h3>
                <p className="text-sm text-gray-500">
                  현재 위치 기준 가까운 맛집 찾기
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>

          {/* 직접 검색 */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔍</span>
              <div className="text-left flex-1">
                <h3 className="font-medium text-gray-900">맛집 검색</h3>
                <p className="text-sm text-gray-500">이름으로 직접 검색하기</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>

          {/* 찜한 맛집 */}
          <button
            onClick={() => setShowFavoriteModal(true)}
            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💙</span>
              <div className="text-left flex-1">
                <h3 className="font-medium text-gray-900">찜한 맛집</h3>
                <p className="text-sm text-gray-500">저장해둔 맛집에서 선택</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
        </div>

        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            💡 위 옵션 중 하나를 선택해서 맛집을 골라주세요
          </p>
        </div>
      </div>

      {/* 모달들 */}
      {showNearbyModal && (
        <NearbyRestaurantModal
          onClose={() => setShowNearbyModal(false)}
          onSelect={(restaurant) => {
            onRestaurantSelect(restaurant);
            setShowNearbyModal(false);
          }}
        />
      )}

      {showSearchModal && (
        <SearchRestaurantModal
          onClose={() => setShowSearchModal(false)}
          onSelect={(restaurant) => {
            onRestaurantSelect(restaurant);
            setShowSearchModal(false);
          }}
        />
      )}

      {showFavoriteModal && (
        <FavoriteRestaurantModal
          onClose={() => setShowFavoriteModal(false)}
          onSelect={(restaurant) => {
            onRestaurantSelect(restaurant);
            setShowFavoriteModal(false);
          }}
        />
      )}
    </>
  );
}
