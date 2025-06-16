"use client";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";
import { useRestaurantList } from "@/app/shared/hooks/queries/useRestaurant";
import { FavoriteRestaurant } from "@/app/shared/types";

interface FavoriteRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function FavoriteRestaurantModal({
  onClose,
  onSelect,
}: FavoriteRestaurantModalProps) {
  const { data: favorites, isLoading, isError } = useRestaurantList();

  const handleSelect = (restaurant: FavoriteRestaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id.toString(),
      name: restaurant.name,
      location: restaurant.address,
      category: restaurant.address.split(" • ")[0], // "멕시칸음식 • 을지로" -> "멕시칸음식"
      phone: "",
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
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">로딩중...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-8 text-red-500">
              <span className="text-4xl mb-4 block">😞</span>
              <p>데이터를 불러오는데 실패했습니다</p>
            </div>
          )}

          {!isLoading && !isError && favorites?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">💙</span>
              <p>찜한 맛집이 없습니다</p>
              <p className="text-sm mt-2">맛집을 찜해보세요!</p>
            </div>
          )}

          {favorites && favorites.length > 0 && (
            <div className="p-4 space-y-2">
              {favorites.map(
                (restaurant: FavoriteRestaurant, index: number) => (
                  <button
                    key={restaurant.id}
                    onClick={() => handleSelect(restaurant)}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-center space-x-3">
                      {/* 순위 */}
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm font-medium text-gray-600 flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* 이미지 자리 */}
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">🍽️</span>
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate mb-1">
                          {restaurant.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-1 truncate">
                          {restaurant.address}
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-sm">⭐</span>
                            <span className="text-sm font-medium ml-1">
                              {restaurant.rating}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-500 text-sm">👍</span>
                            <span className="text-red-500 text-sm font-medium ml-1">
                              {restaurant.reviews}개
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 선택 아이콘 */}
                      <div className="text-blue-500">→</div>
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
