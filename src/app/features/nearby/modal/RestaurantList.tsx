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
import { baropotService } from '@/app/shared/services/baropotService';

interface RestaurantListProps {
  restaurants?: NearbyRestaurant[];
  onCreateBaropot?: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantList({
  restaurants = [],
  // onCreateBaropot,
}: RestaurantListProps) {
  const router = useRouter();
  const createBaropotMutation = useCreateBaropot();
  const { data: restaurantList = [] } = useRestaurantList({});
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );

  const getCurrentUserId = () => {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : 1;
  };

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

      // 서버 응답을 기다려서 실제 생성된 바로팟 ID를 받음
      const response = await createBaropotMutation.mutateAsync(baropotData);

      // 서버에서 반환된 실제 바로팟 ID 사용
      const serverBaropotId = response.id;
      console.log('✅ 바로팟 생성 성공! 서버 바로팟 ID:', serverBaropotId);

      // sessionStorage 정리
      sessionStorage.removeItem('baropotData');
      sessionStorage.removeItem('selectedRestaurant');

      alert('🎉 바로팟이 생성되었습니다!');

      // 생성된 바로팟의 상세 페이지로 이동
      router.push(`/baropot/${serverBaropotId}`);
    } catch (error) {
      console.error('바로팟 생성 실패:', error);
      alert('바로팟 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSelectedRestaurant(null);
    }
  };

  const handleConfirmSelection = async (restaurant: NearbyRestaurant) => {
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
      try {
        const existingBaropots = await baropotService.getBaropotByRestaurant(
          existingRestaurant.id
        );

        if (existingBaropots && existingBaropots.length > 0) {
          const activeBaropot = existingBaropots[0]; // 첫 번째 활성 바로팟

          console.log('🎯 기존 바로팟 발견:', activeBaropot.id);

          const currentUserId = getCurrentUserId();

          if (activeBaropot.host.userId === currentUserId) {
            // 내가 만든 바로팟 → 관리 페이지로
            alert('이미 이 맛집에 본인이 만든 바로팟이 있습니다!');
            router.push(`/baropot/${activeBaropot.id}/manage`);
          } else {
            // 다른 사람이 만든 바로팟 → 참가 페이지로
            alert('이미 이 맛집에 바로팟이 있습니다! 참가하시겠어요?');
            router.push(`/baropot/${activeBaropot.id}`);
          }
          return;
        }
        // 바로팟이 없으면 새로 생성
        console.log('✅ 바로팟이 없음. 새로 생성합니다.');
        handleQuickBaropotCreation(existingRestaurant.id);
      } catch (error) {
        console.error('바로팟 조회 실패:', error);
        // 에러가 발생해도 바로팟 생성은 진행
        handleQuickBaropotCreation(existingRestaurant.id);
      }
    } else {
      // 등록되지 않은 맛집이면 맛집 등록 페이지로 이동
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
                    📍 {Math.round(Number(restaurant.distance))}m
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
                      text={isCreating ? '확인중...' : '바로팟 확인'}
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
