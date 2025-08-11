'use client';
import { NearbyRestaurant } from '@/app/shared/types';
import { useRouter } from 'next/navigation';
import { useRestaurantSelection } from '@/app/shared/hooks/useRestaurantSelection';
import { useToast } from '@/app/shared/hooks/useToast';
import RestaurantModalHeader from './searchModal/RestaurantModalHeader';
import RestaurantInfoCard from './searchModal/RestaurantInfoCard';
import RestaurantActionButtons from './searchModal/RestaurantActionButtons';

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
}: RestaurantPreviewModalProps) {
  const toast = useToast();
  const router = useRouter();

  const { handleRestaurantSelection, isProcessing, findRegisteredRestaurant } =
    useRestaurantSelection({
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
    handleRestaurantSelection(restaurant);
  };

  if (!isOpen) return null;

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="animate-slideUp w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <RestaurantModalHeader restaurant={restaurant} onClose={onClose} />

        {/* 맛집 정보 */}
        <div className="space-y-6 p-6">
          <RestaurantInfoCard restaurant={restaurant} />

          {/* Action Buttons */}
          <RestaurantActionButtons
            isProcessing={isProcessing}
            hasServerData={hasServerData}
            onClose={onClose}
            handleDetailView={handleDetailView}
            handleCreateBaropot={() => handleRegisterRestaurant()}
            handleRegisterRestaurant={handleRegisterRestaurant}
          />
        </div>
      </div>
    </div>
  );
}
