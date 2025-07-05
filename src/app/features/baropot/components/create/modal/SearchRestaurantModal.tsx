'use client';
import { RestaurantData } from '@/app/features/nearby/types/restaurant';
import { KakaoRestaurant } from '@/app/shared/types/kakao';
import React, { useState } from 'react';
import { Button, Input } from '@/app/shared/ui';

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
      console.error('검색 중 오류가 발생하였습니다.', error);
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
      phone: restaurant.phone || '',
    };
    onSelect(restaurantData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
            <div className="py-8 text-center text-gray-500">
              <span className="mb-4 block text-4xl">🔍</span>
              <p>맛집 이름을 검색해보세요!</p>
            </div>
          )}

          {isLoading && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-500">검색중...</p>
            </div>
          )}

          {hasSearched && !isLoading && searchResults.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              <span className="mb-4 block text-4xl">😅</span>
              <p>검색 결과가 없습니다</p>
              <p className="mt-2 text-sm">다른 키워드로 검색해보세요</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-2 p-4">
              {searchResults.map(
                (restaurant: KakaoRestaurant, index: number) => (
                  <button
                    key={restaurant.id || index}
                    onClick={() => handleSelect(restaurant)}
                    className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500">
                        <span className="text-sm text-white">🍽️</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-medium text-gray-900">
                          {restaurant.place_name}
                        </h4>
                        <p className="truncate text-sm text-gray-600">
                          {restaurant.category_name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
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
