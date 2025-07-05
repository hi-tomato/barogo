'use client';
import { RestaurantData } from '@/app/features/nearby/types/restaurant';
import { useGetBookMarks } from '@/app/shared/hooks/queries/useRestaurant';
import { Restaurant } from '@/app/shared/types/restaurant';
import { StateDisplay } from '@/app/shared/ui';

interface FavoriteRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function FavoriteRestaurantModal({
  onClose,
  onSelect,
}: FavoriteRestaurantModalProps) {
  const { data: favorites, isLoading, isError } = useGetBookMarks();

  const handleSelect = (restaurant: Restaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id.toString(),
      name: restaurant.name,
      location: restaurant.address,
      category: restaurant.category,
      phone: restaurant.phoneNumber,
      lat: restaurant.lat.toString(),
      lng: restaurant.lng.toString(),
    };
    onSelect(restaurantData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="font-semibold text-gray-900">찜한 맛집</h3>
            <p className="text-sm text-gray-500">
              저장해둔 맛집에서 선택하세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* 리스트 */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <StateDisplay
              state="loading"
              loadingMessage="찜한 맛집을 불러오는 중..."
              size="md"
            />
          ) : isError ? (
            <StateDisplay
              state="error"
              errorMessage="찜한 맛집을 불러오는데 실패했습니다"
              size="md"
            />
          ) : !favorites || favorites.length === 0 ? (
            <StateDisplay
              state="empty"
              emptyMessage="찜한 맛집이 없습니다"
              emptyIcon="💙"
              size="md"
            />
          ) : (
            <div className="space-y-3 p-4">
              {favorites.map((restaurant: Restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleSelect(restaurant)}
                  className="w-full rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    {/* 카테고리 아이콘 */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <span className="text-lg text-white">🍽️</span>
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 text-left">
                      <h4 className="truncate font-medium text-gray-900">
                        {restaurant.name}
                      </h4>
                      <p className="truncate text-sm text-gray-500">
                        {restaurant.category}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        📍 {restaurant.address}
                      </p>
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
