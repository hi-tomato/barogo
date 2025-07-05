'use client';
import { useGeolocation } from '@/app/shared/hooks/useGeolocation';
import { useMockNearby } from '@/app/features/nearby/hooks/queries/useMockNearby';
import { RestaurantData } from '@/app/features/nearby/types/restaurant';
import {
  getCategoryIcon,
  getGradientByCategory,
} from '@/app/features/nearby/utils/categoryHelpers';
import { NearbyRestaurant } from '@/app/shared/types';
import { StateDisplay } from '@/app/shared/ui';

interface NearbyRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function NearbyRestaurantModal({
  onClose,
  onSelect,
}: NearbyRestaurantModalProps) {
  const {
    location,
    isLoading: locationLoading,
    error: locationError,
    getCurrentLocation,
  } = useGeolocation();
  const {
    data: restaurants = [],
    isLoading,
    error: restaurantsError,
  } = useMockNearby(location);

  const handleSelect = (restaurant: NearbyRestaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id,
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      phone: restaurant.phone || '',
      lat: restaurant.x || '',
      lng: restaurant.y || '',
    };
    onSelect(restaurantData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-semibold text-gray-900">내 주변 맛집</h3>
            <p className="text-sm text-gray-500">현재 위치 기준 가까운 맛집</p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* 위치 권한이 없을 때 */}
          {!location && !locationLoading && (
            <div className="py-8 text-center">
              <span className="mb-4 block text-4xl">📍</span>
              <p className="mb-4 text-gray-600">위치 권한이 필요합니다</p>
              <button
                onClick={getCurrentLocation}
                className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
              >
                현재 위치 찾기
              </button>
            </div>
          )}

          {/* 위치 에러 */}
          {locationError && (
            <StateDisplay
              state="error"
              errorMessage={locationError}
              onRetry={getCurrentLocation}
              size="md"
            />
          )}

          {/* 로딩 상태 */}
          {isLoading && location && (
            <StateDisplay
              state="loading"
              loadingMessage="맛집을 찾는 중..."
              size="md"
            />
          )}

          {/* 맛집 에러 */}
          {restaurantsError && (
            <StateDisplay
              state="error"
              errorMessage="맛집 정보를 불러오는데 실패했습니다"
              size="md"
            />
          )}

          {/* 맛집이 없을 때 */}
          {location &&
            !isLoading &&
            restaurants.length === 0 &&
            !restaurantsError && (
              <StateDisplay
                state="empty"
                emptyMessage="주변에 맛집이 없습니다"
                emptyIcon="🤷‍♂️"
                size="md"
              />
            )}

          {/* 맛집 리스트 */}
          {restaurants.length > 0 && (
            <div className="space-y-3 p-4">
              {restaurants.map(
                (restaurant: NearbyRestaurant, index: number) => (
                  <button
                    key={restaurant.id || index}
                    onClick={() => handleSelect(restaurant)}
                    className="w-full rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      {/* 카테고리 아이콘 */}
                      <div
                        className={`h-12 w-12 bg-gradient-to-br ${getGradientByCategory(
                          restaurant.category_name
                        )} flex flex-shrink-0 items-center justify-center rounded-lg`}
                      >
                        <span className="text-lg text-white">
                          {getCategoryIcon(restaurant.category_name)}
                        </span>
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 text-left">
                        <h4 className="truncate font-medium text-gray-900">
                          {restaurant.place_name}
                        </h4>
                        <p className="truncate text-sm text-gray-500">
                          {restaurant.category_name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          📍 {restaurant.address_name}
                        </p>
                        {restaurant.distance && (
                          <p className="text-xs text-blue-500">
                            🚶‍♂️ {restaurant.distance}
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
