'use client';
import { NearbyRestaurant } from '@/app/shared/types';
import { useRouter } from 'next/navigation';
import Button from '@/app/shared/ui/Button';
import { RestaurantStatus } from './Status';
import { useRestaurantSelection } from '@/app/shared/hooks/useRestaurantSelection';
import { useToast } from '@/app/shared/hooks/useToast';

interface RestaurantPreviewModalProps {
  restaurant: NearbyRestaurant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantPreviewModal({
  restaurant,
  isOpen,
  onClose,
  onConfirm,
}: RestaurantPreviewModalProps) {
  const toast = useToast();
  const router = useRouter();
  const { handleRestaurantSelection, isProcessing, findRegisteredRestaurant } =
    useRestaurantSelection({
      onSuccess: (baropotId) => {
        onClose();
        toast.success('바로팟 생성을 완료하였습니다.');
        router.push(`/baropot/${baropotId}`);
      },
      onBaropotFound: (baropotId) => {
        onClose();
        toast.success('등록된 맛집이 있습니다!');
        router.push(`/baropot/${baropotId}`);
      },
      onRegistrationNeeded: () => {
        onClose();
        router.push(`/restaurants/create`);
      },
    });

  const existingRestaurant = findRegisteredRestaurant(restaurant);
  const hasServerData = !!existingRestaurant;

  // 상세 페이지
  const handleDetailView = () => {
    if (existingRestaurant) {
      onClose();
      router.push(`/restaurants/${existingRestaurant.id}`);
    }
  };

  // 맛집 등록 버튼 클릭
  const handleRegisterRestaurant = async () => {
    if (!restaurant.x || !restaurant.y) {
      toast.error('위치 정보가 없어서 맛집을 등록할 수 없습니다.');
      return;
    }
    try {
      await handleRestaurantSelection(restaurant);
    } catch (error) {
      console.error('맛집 등록 실패: ', error);
    }
  };

  // 바로팟 생성 핸들러
  const handleCreateBaropot = () => {
    handleRegisterRestaurant();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        {/* 헤더 */}
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-bold">맛집 정보</h3>
          <Button
            text="✕"
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          />
        </div>

        {/* 맛집 정보 */}
        <div className="mb-6 space-y-3">
          <h4 className="text-lg font-semibold">{restaurant.place_name}</h4>
          <p className="text-sm text-gray-600">{restaurant.category_name}</p>
          <p className="text-sm text-gray-600">📍 {restaurant.address_name}</p>
          {restaurant.road_address_name && (
            <p className="text-sm text-gray-500">
              🛣️ {restaurant.road_address_name}
            </p>
          )}
          {restaurant.phone && (
            <p className="text-sm text-gray-600">📞 {restaurant.phone}</p>
          )}
        </div>

        {/* Action Buttons - 조건별 렌더링 */}
        <div className="space-y-3">
          {/* 로딩 중일 때 */}
          {isProcessing && (
            <RestaurantStatus type="isLoading" onClose={onClose} />
          )}

          {/* 서버에 데이터가 있을 때 - 상세보기 + 바로팟 만들기 */}
          {!isProcessing && hasServerData && (
            <RestaurantStatus
              type="hasServerData"
              onClose={onClose}
              onDetailView={handleDetailView}
              onCreateBaropot={handleCreateBaropot}
            />
          )}

          {/* 서버에 데이터가 없을 때 - 맛집 등록 + 바로팟 만들기 */}
          {!isProcessing && !hasServerData && (
            <RestaurantStatus
              type="notServerData"
              onClose={onClose}
              onRegisterRestaurant={handleRegisterRestaurant}
              onCreateBaropot={handleCreateBaropot}
              isRegistering={isProcessing}
            />
          )}
        </div>
      </div>
    </div>
  );
}
