import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { NearbyRestaurant } from '@/app/shared/types';
import { useCreateBaropot } from '@/app/shared/hooks/queries/useBaropot';

interface UseRestaurantSelectionOptions {
  onSuccess?: (restaurantId: number) => void;
  onBaropotFound?: (baropotId: number) => void;
  onRegistrationNeeded?: (restaurant: NearbyRestaurant) => void;
  redirectPath?: string;
}

export const useRestaurantSelection = (
  options: UseRestaurantSelectionOptions
) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  // Create, Fetching Hooks
  const { data: restaurantList = [] } = useRestaurantList({});
  const createBaropotMutation = useCreateBaropot();

  // TODO: 서버에 등록되어있는 맛집인지 체크, 현재 RestaurantID와 Fetch된 RestaurantID가 일치하는지 체크함
  const findRegisteredRestaurant = (restaurant: NearbyRestaurant) => {
    return restaurantList.find(
      (item) =>
        item.name === restaurant.place_name ||
        (item.name.includes(restaurant.place_name.split(' ')[0]) &&
          item.address === restaurant.address_name) ||
        item.id === Number(restaurant.id)
    );
  };
  // TODO: 바로팟 빠른 생성 (Create Hook)
  // const createQuickBaropot = async (restaurantId: number) => {
  //   setSelectedRestaurant(restaurantId);

  //   const baropotData: CreateBaropotRequest = {
  //     restaurantId: restaurantId,
  //     title: '같이 가실분!',
  //     location: '맛집 근처에서 만나요',
  //     maxParticipants: 4,
  //     date: new Date().toISOString().split('T')[0],
  //     time: '19:00',
  //     participantGender: ParticipantGender.ANY,
  //     participantAgeGroup: ParticipantAgeGroup.ANY,
  //     contactMethod: ContactMethod.APP_CHAT,
  //     estimatedCostPerPerson: 30000,
  //     paymentMethod: PaymentMethod.DUTCH_PAY,
  //     description: '같이 식사하실 분을 찾습니다!',
  //     rule: '시간 약속 잘 지켜주세요~',
  //     tags: ['맛집', '함께식사', '바로팟'],
  //   };

  //   const response = await createBaropotMutation.mutateAsync(baropotData);

  //   sessionStorage.removeItem('baropotData');
  //   sessionStorage.removeItem('selectedRestaurant');

  //   toast.success('🎉 바로팟이 생성되었습니다!');
  //   return response.id;
  // };

  const handleRestaurantSelection = async (restaurant: NearbyRestaurant) => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      const existingRestaurant = findRegisteredRestaurant(restaurant);

      if (existingRestaurant) {
        if (options.onSuccess) {
          options.onSuccess(existingRestaurant.id);
        } else {
          router.push(`/restaurants/${existingRestaurant.id}/baropot/create`);
        }
        return;
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
        const redirectPath = options.redirectPath || '/restaurants/create';
        router.push(redirectPath);
      }
    } catch (error) {
      console.error('맛집 선택 처리 중 오류 발생:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleRestaurantSelection,
    isProcessing: isProcessing || createBaropotMutation.isPending,
    selectedRestaurant,
    findRegisteredRestaurant,
  };
};
