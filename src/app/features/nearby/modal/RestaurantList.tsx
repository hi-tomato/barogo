'use client';
import { useRouter } from 'next/navigation';
import { NearbyRestaurant } from '@/app/shared/types';
import {
  getCategoryIcon,
  getGradientByCategory,
} from '../../nearby/utils/categoryHelpers';
import Button from '@/app/shared/ui/Button';
import { useRestaurantSelection } from '@/app/shared/hooks/useRestaurantSelection';

interface RestaurantListProps {
  restaurants?: NearbyRestaurant[];
}

export default function RestaurantList({
  restaurants = [],
}: RestaurantListProps) {
  const router = useRouter();

  const {
    handleRestaurantSelection,
    isProcessing,
    selectedRestaurant,
    findRegisteredRestaurant,
  } = useRestaurantSelection({
    onSuccess: (baropotId) => {
      alert('바로팟이 생성되었습니다!');
      router.push(`/baropot/${baropotId}`);
    },
    onBaropotFound: (baropotId) => {
      alert('이미 등록된 맛집이있습니다!');
      router.push(`/baropot/${baropotId}`);
    },
    onRegistrationNeeded: () => {
      router.back();
      setTimeout(() => {
        router.push('/restaurants/create');
      }, 300);
    },
  });

  const handleSelection = async (restaurant: NearbyRestaurant) => {
    try {
      await handleRestaurantSelection(restaurant);
    } catch (error) {
      console.error('맛집 선택 실패:', error);
      alert(error instanceof Error ? error.message : '오류가 발생했습니다.');
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {restaurants.map((restaurant, index) => {
        const existingRestaurant = findRegisteredRestaurant(restaurant);
        const isRegistered = !!existingRestaurant;
        const isCreating = selectedRestaurant === Number(restaurant.id);

        return (
          <div
            key={restaurant.id || index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              {/* 아이콘 */}
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
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center space-x-2">
                  <h3 className="truncate font-semibold text-gray-900">
                    {restaurant.place_name}
                  </h3>
                  {isRegistered && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                      등록됨
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-gray-600">
                  {restaurant.category_name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {restaurant.address_name}
                </p>
                {restaurant.distance && (
                  <p className="mt-1 text-xs text-blue-600">
                    📍 {Math.round(Number(restaurant.distance))}m
                  </p>
                )}
                {restaurant.phone && (
                  <p className="text-xs text-gray-500">📞 {restaurant.phone}</p>
                )}
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-col space-y-2">
                <Button
                  text={
                    isCreating
                      ? '확인중...'
                      : isRegistered
                        ? '바로팟 확인'
                        : '맛집 등록'
                  }
                  onClick={() => handleSelection(restaurant)}
                  disabled={isProcessing}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium text-white transition-all hover:shadow-md ${
                    isProcessing
                      ? 'cursor-not-allowed bg-gray-400'
                      : isRegistered
                        ? 'bg-gradient-to-r from-orange-400 to-red-400'
                        : 'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
