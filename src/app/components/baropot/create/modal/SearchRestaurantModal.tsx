"use client";
import { KakaoRestaurant } from "@/app/types/kakao";
import { RestaurantData } from "@/app/types/restaurant";
import React, { useState } from "react";

interface SearchRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function SearchRestaurantModal({
  onClose,
  onSelect,
}: SearchRestaurantModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<KakaoRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search-restaurants?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.documents || []);
    } catch (error) {
      console.error("검색 중 오류가 발생하였습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (restaurant: KakaoRestaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id,
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      phone: restaurant.phone || "",
    };
    onSelect(restaurantData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-gray-900">맛집 검색</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* 검색바 */}
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="맛집 이름을 입력하세요"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "검색중..." : "검색"}
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="overflow-y-auto max-h-[50vh]">
          {!hasSearched && (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">🔍</span>
              <p>맛집 이름을 검색해보세요!</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">검색중...</p>
            </div>
          )}

          {hasSearched && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">😅</span>
              <p>검색 결과가 없습니다</p>
              <p className="text-sm mt-2">다른 키워드로 검색해보세요</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="p-4 space-y-2">
              {searchResults.map(
                (restaurant: KakaoRestaurant, index: number) => (
                  <button
                    key={restaurant.id || index}
                    onClick={() => handleSelect(restaurant)}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🍽️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {restaurant.place_name}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {restaurant.category_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {restaurant.address_name}
                        </p>
                        {restaurant.phone && (
                          <p className="text-xs text-gray-500">
                            📞 {restaurant.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
