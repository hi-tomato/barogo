import { Status } from '@/app/shared/ui';
import { RestaurantDetail } from '@/app/features/nearby/types/restaurant';

interface RestaurantModalState {
  isLoading: boolean;
  isError: boolean;
  restaurantDetail: RestaurantDetail | null | undefined;
}

export const getStatusMessage = ({
  isLoading,
  isError,
  restaurantDetail,
}: RestaurantModalState) => {
  if (isLoading) {
    return (
      <Status
        type="success"
        icon="✅"
        title="등록된 맛집입니다!"
        message="리뷰와 바로팟을 확인하세요."
        className="text-green-600"
        size="sm"
        variant="inline"
      />
    );
  }

  if (restaurantDetail && !isError) {
    return (
      <Status
        type="success"
        icon="✅"
        title="등록된 맛집입니다!"
        message="리뷰와 바로팟을 확인하세요."
        className="text-green-600"
        size="sm"
        variant="inline"
      />
    );
  }

  return (
    <Status
      type="custom"
      icon="🆕"
      title="새로운 맛집입니다!"
      message="첫 바로팟을 만들어보세요."
      className="text-orange-600"
      size="sm"
      variant="inline"
    />
  );
};
