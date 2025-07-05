'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NearbyRestaurant } from '@/app/shared/types';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { CreateBaropotRequest } from '@/app/shared/types/baropots';
import {
  ContactMethod,
  ParticipantAgeGroup,
  ParticipantGender,
  PaymentMethod,
} from '@/app/shared/types/enums';
import {
  getCategoryIcon,
  getGradientByCategory,
} from '../../nearby/utils/categoryHelpers';
import Button from '@/app/shared/ui/Button';
import { useCreateBaropot } from '@/app/shared/hooks/queries/useBaropot';

interface RestaurantListProps {
  restaurants?: NearbyRestaurant[];
  onCreateBaropot?: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantList({
  restaurants = [],
  onCreateBaropot,
}: RestaurantListProps) {
  const router = useRouter();
  const createBaropotMutation = useCreateBaropot();
  const { data: restaurantList = [] } = useRestaurantList({});
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );

  const findRegisteredRestaurant = (restaurant: NearbyRestaurant) => {
    return restaurantList.find(
      (item) =>
        item.name === restaurant.place_name ||
        (item.name.includes(restaurant.place_name.split(' ')[0]) &&
          item.address === restaurant.address_name) ||
        item.id === Number(restaurant.id)
    );
  };

  const handleQuickBaropotCreation = async (restaurantId: number) => {
    try {
      setSelectedRestaurant(restaurantId);

      const baropotData: CreateBaropotRequest = {
        restaurantId: restaurantId,
        title: '같이 가실분!',
        location: '맛집 근처에서 만나요',
        maxParticipants: 4,
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        participantGender: ParticipantGender.ANY,
        participantAgeGroup: ParticipantAgeGroup.ANY,
        contactMethod: ContactMethod.APP_CHAT,
        estimatedCostPerPerson: 30000,
        paymentMethod: PaymentMethod.DUTCH_PAY,
        description: '같이 식사하실 분을 찾습니다!',
        rule: '시간 약속 잘 지켜주세요~',
        tags: ['맛집', '함께식사', '바로팟'],
      };

      console.log('🚀 바로팟 생성 데이터:', baropotData);

      await createBaropotMutation.mutateAsync(baropotData);

      alert('🎉 바로팟이 생성되었습니다!');
      router.push('/baropot');
    } catch (error) {
      console.error('바로팟 생성 실패:', error);
      alert('바로팟 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSelectedRestaurant(null);
    }
  };

  const handleConfirmSelection = (restaurant: NearbyRestaurant) => {
    if (
      !restaurant.id ||
      !restaurant.place_name ||
      !restaurant.address_name ||
      !restaurant.category_name ||
      !restaurant.x ||
      !restaurant.y
    ) {
      console.error('필수 데이터 누락:', {
        id: restaurant.id,
        place_name: restaurant.place_name,
        address_name: restaurant.address_name,
        category_name: restaurant.category_name,
        x: restaurant.x,
        y: restaurant.y,
      });
      console.error('맛집 정보가 불완전합니다. 다시 선택해주세요.');
      return;
    }

    // 서버에 등록된 맛집인지 확인
    const existingRestaurant = findRegisteredRestaurant(restaurant);

    if (existingRestaurant) {
      handleQuickBaropotCreation(existingRestaurant.id);
    } else {
      const restaurantData = {
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || '',
        x: restaurant.x,
        y: restaurant.y,
      };

      sessionStorage.setItem(
        'selectedRestaurant',
        JSON.stringify(restaurantData)
      );

      router.back();
      setTimeout(() => {
        router.push('/restaurants/create');
      }, 300);
    }
  };

  const handleDetailedBaropotCreation = (restaurant: NearbyRestaurant) => {
    const existingRestaurant = findRegisteredRestaurant(restaurant);

    if (existingRestaurant) {
      const baropotData = {
        restaurantId: existingRestaurant.id,
      };

      sessionStorage.setItem('baropotData', JSON.stringify(baropotData));
      router.push(`/restaurants/${existingRestaurant.id}/baropot/create`);
    } else {
      alert('먼저 맛집을 등록해주세요!');
    }
  };

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-4xl">🍽️</div>
        <p className="mb-2 text-gray-600">맛집을 찾을 수 없습니다</p>
        <p className="text-sm text-gray-500">다른 검색어로 다시 시도해보세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {restaurants.map((restaurant, index) => {
        const isRegistered = restaurantList.some(
          (item) =>
            item.name === restaurant.place_name ||
            (item.name.includes(restaurant.place_name.split(' ')[0]) &&
              item.address === restaurant.address_name) ||
            item.id === Number(restaurant.id)
        );

        const existingRestaurant = findRegisteredRestaurant(restaurant);
        const isCreating = selectedRestaurant === existingRestaurant?.id;

        return (
          <div
            key={restaurant.id || index}
            className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`h-12 w-12 bg-gradient-to-br ${getGradientByCategory(
                  restaurant.category_name
                )} flex flex-shrink-0 items-center justify-center rounded-lg`}
              >
                <span className="text-lg text-white">
                  {getCategoryIcon(restaurant.category_name)}
                </span>
              </div>

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
                    �� {Math.round(Number(restaurant.distance))}m
                  </p>
                )}
                {restaurant.phone && (
                  <p className="text-xs text-gray-500">📞 {restaurant.phone}</p>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {isRegistered ? (
                  <>
                    <Button
                      text={isCreating ? '생성중...' : '바로팟 생성'}
                      onClick={() => handleConfirmSelection(restaurant)}
                      disabled={isCreating || createBaropotMutation.isPending}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium text-white transition-all hover:shadow-md ${
                        isCreating || createBaropotMutation.isPending
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-gradient-to-r from-orange-400 to-red-400'
                      }`}
                    />
                  </>
                ) : (
                  <Button
                    text="맛집 등록"
                    onClick={() => handleConfirmSelection(restaurant)}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-1 text-xs font-medium text-white transition-all hover:shadow-md"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
