'use client';
import { RestaurantData } from '@/app/features/nearby/types/restaurant';
import { KakaoRestaurant } from '@/app/shared/types/kakao';
import React, { useState } from 'react';
import { Button, Input, StateDisplay } from '@/app/shared/ui';

interface SearchRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function SearchRestaurantModal({
  onClose,
  onSelect,
}: SearchRestaurantModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
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
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = (restaurant: KakaoRestaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id,
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      phone: restaurant.phone,
      lat: restaurant.x,
      lng: restaurant.y,
    };
    onSelect(restaurantData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-gray-900">맛집 검색</h3>
          <Button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </Button>
        </div>

        {/* 검색바 */}
        <div className="border-b p-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="맛집 이름을 입력하세요"
              autoFocus
              fullWidth={false}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? '검색중...' : '검색'}
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-[50vh] overflow-y-auto">
          {!hasSearched && (
            <StateDisplay
              state="empty"
              emptyMessage="맛집 이름을 검색해보세요!"
              emptyIcon="🔍"
              size="md"
            />
          )}

          {isLoading && (
            <StateDisplay
              state="loading"
              loadingMessage="검색중..."
              size="md"
            />
          )}

          {hasSearched && !isLoading && searchResults.length === 0 && (
            <StateDisplay
              state="empty"
              emptyMessage="검색 결과가 없습니다"
              emptyIcon="😅"
              size="md"
            />
          )}

          {searchResults.length > 0 && (
            <div className="space-y-3 p-4">
              {searchResults.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleSelect(restaurant)}
                  className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    {/* 카테고리 아이콘 */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <span className="text-lg text-white">🍽️</span>
                    </div>

                    {/* 정보 */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-medium text-gray-900">
                        {restaurant.place_name}
                      </h4>
                      <p className="truncate text-sm text-gray-500">
                        {restaurant.category_name}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        📍 {restaurant.address_name}
                      </p>
                      {restaurant.phone && (
                        <p className="text-xs text-gray-400">
                          📞 {restaurant.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
