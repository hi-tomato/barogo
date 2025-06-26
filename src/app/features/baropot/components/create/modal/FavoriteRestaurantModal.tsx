"use client";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";
import { useGetBookMarks } from "@/app/shared/hooks/queries/useRestaurant";
import { Restaurant } from "@/app/shared/types/restaurant";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="font-semibold text-gray-900">찜한 맛집</h3>
            <p className="text-sm text-gray-500">
              저장해둔 맛집에서 선택하세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* 리스트 */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">찜한 맛집을 불러오는 중...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              <span className="text-4xl mb-4 block">😞</span>
              <p>찜한 맛집을 불러오는데 실패했습니다</p>
            </div>
          ) : !favorites || favorites.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">💙</span>
              <p>찜한 맛집이 없습니다</p>
              <p className="text-sm mt-2">맛집을 찜하고 다시 시도해보세요</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {favorites.map((restaurant, index) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleSelect(restaurant)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-medium text-gray-900 truncate">
                        {restaurant.name}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {restaurant.category}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {restaurant.address}
                      </p>
                      {restaurant.phoneNumber && (
                        <p className="text-xs text-gray-500">
                          📞 {restaurant.phoneNumber}
                        </p>
                      )}
                    </div>
                    {/* 선택 아이콘 */}
                    <div className="text-blue-500">→</div>
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
