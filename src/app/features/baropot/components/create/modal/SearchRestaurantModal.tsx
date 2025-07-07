'use client';
import { RestaurantData } from '@/app/features/nearby/types/restaurant';
import { KakaoRestaurant } from '@/app/shared/types/kakao';
import React, { useState } from 'react';
import { Button, Input, StateDisplay } from '@/app/shared/ui';
import { useSearchRestaurants } from '@/app/shared/hooks/useSearchRestaurants';
import { useRestaurantSelection } from '@/app/shared/hooks/useRestaurantSelection';
import { useRouter } from 'next/navigation';

interface SearchRestaurantModalProps {
  onClose: () => void;
  onSelect?: (restaurant: RestaurantData) => void;
}

export default function SearchRestaurantModal({
  onClose,
  onSelect,
}: SearchRestaurantModalProps) {
  const router = useRouter();
  const { handleRestaurantSelection, isProcessing } = useRestaurantSelection({
    onSuccess: (baropotId) => {
      onClose();
      alert('바로팟을 생성되었습니다');
      router.push(`/baropot/${baropotId}`);
    },
    onBaropotFound: (baropotId) => {
      onClose();
      alert('이미 등록된 맛집에 바로팟이 있습니다.');
      router.push(`/baropot/${baropotId}`);
    },
    onRegistrationNeeded: () => {
      onClose();
      router.push('/restaurants/create');
    },
  });
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading: isSearching,
    error,
    searchRestaurants,
    handleKeyPress,
  } = useSearchRestaurants();

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    await searchRestaurants(searchQuery);
  };

  const handleSelect = async (restaurant: KakaoRestaurant) => {
    if (onSelect) {
      const restaurantData = {
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone,
        lat: restaurant.x,
        lng: restaurant.y,
      };
      onSelect(restaurantData);
    } else {
      try {
        const nearbyRestaurant = {
          id: restaurant.id,
          place_name: restaurant.place_name,
          address_name: restaurant.address_name,
          category_name: restaurant.category_name,
          phone: restaurant.phone || '',
          distance: '',
          place_url: '',
          x: restaurant.x,
          y: restaurant.y,
        };

        await handleRestaurantSelection(nearbyRestaurant);
      } catch (error) {
        console.error('맛집 선택 실패:', error);
        alert(error instanceof Error ? error.message : '오류가 발생했습니다.');
      }
    }
  };

  const isLoading = isSearching || isProcessing;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-gray-900">맛집 검색</h3>
          <Button
            text="X"
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
            disabled={isProcessing}
          />
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
              disabled={isProcessing}
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSearching ? '검색중...' : '검색'}
            </Button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-[50vh] overflow-y-auto">
          {!hasSearched && !isLoading && (
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
              loadingMessage={isSearching ? '검색중...' : '처리중...'}
              size="md"
            />
          )}

          {error && (
            <StateDisplay
              state="error"
              errorMessage={error}
              onRetry={() => handleSearch()}
              size="md"
            />
          )}

          {hasSearched &&
            !isLoading &&
            !error &&
            searchResults.length === 0 && (
              <StateDisplay
                state="empty"
                emptyMessage="검색 결과가 없습니다"
                emptyIcon="😅"
                size="md"
              />
            )}

          {/* 검색 결과 목록 */}
          {searchResults.length > 0 && !isLoading && (
            <div className="space-y-3 p-4">
              {searchResults.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleSelect(restaurant)}
                  disabled={isProcessing}
                  className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
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

                    {/* 처리 중 표시 */}
                    {isProcessing && (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                        <span className="text-xs text-gray-500">처리중...</span>
                      </div>
                    )}
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
