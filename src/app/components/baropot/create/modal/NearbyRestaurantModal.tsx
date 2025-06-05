"use client";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useMockNearby } from "@/app/hooks/queries/useMockNearby";
import { RestaurantData } from "@/app/types/restaurant";
import { NearbyRestaurant } from "@/app/types/kakao";
import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/hooks/useCategory";

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
    error,
    isLoading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();
  const {
    data: restaurants = [],
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useMockNearby(location);

  const isLoading = locationLoading || restaurantsLoading;

  const handleSelect = (restaurant: NearbyRestaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id,
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      phone: restaurant.phone || "",
    };
    onSelect(restaurantData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="font-semibold text-gray-900">내 주변 맛집</h3>
            <p className="text-sm text-gray-500">현재 위치 기준 가까운 맛집</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="overflow-y-auto max-h-[60vh]">
          {/* 위치 권한이 없을 때 */}
          {!location && !locationLoading && (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📍</span>
              <p className="text-gray-600 mb-4">위치 권한이 필요합니다</p>
              <button
                onClick={getCurrentLocation}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                현재 위치 찾기
              </button>
            </div>
          )}

          {/* 위치 에러 */}
          {error && (
            <div className="text-center py-8 text-red-500">
              <span className="text-4xl mb-4 block">😞</span>
              <p>{error}</p>
              <button
                onClick={getCurrentLocation}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 로딩 상태 */}
          {isLoading && location && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">맛집을 찾는 중...</p>
            </div>
          )}

          {/* 맛집 에러 */}
          {restaurantsError && (
            <div className="text-center py-8 text-red-500">
              <span className="text-4xl mb-4 block">😞</span>
              <p>맛집 정보를 불러오는데 실패했습니다</p>
            </div>
          )}

          {/* 맛집이 없을 때 */}
          {location &&
            !isLoading &&
            restaurants.length === 0 &&
            !restaurantsError && (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-4 block">🤷‍♂️</span>
                <p>주변에 맛집이 없습니다</p>
                <p className="text-sm mt-2">다른 방법으로 검색해보세요</p>
              </div>
            )}

          {/* 맛집 리스트 */}
          {restaurants.length > 0 && (
            <div className="p-4 space-y-3">
              {restaurants.map(
                (restaurant: NearbyRestaurant, index: number) => (
                  <button
                    key={restaurant.id || index}
                    onClick={() => handleSelect(restaurant)}
                    className="w-full border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      {/* 카테고리 아이콘 */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                          restaurant.category_name
                        )} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white text-lg">
                          {getCategoryIcon(restaurant.category_name)}
                        </span>
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-medium text-gray-900 truncate">
                          {restaurant.place_name}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">
                          {restaurant.category_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {restaurant.address_name}
                        </p>
                        {restaurant.distance && (
                          <p className="text-xs text-blue-600 mt-1">
                            📍 {Math.round(Number(restaurant.distance))}m
                          </p>
                        )}
                        {restaurant.phone && (
                          <p className="text-xs text-gray-500">
                            📞 {restaurant.phone}
                          </p>
                        )}
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
