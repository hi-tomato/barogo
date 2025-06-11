import { RestaurantDetail } from "@/app/features/nearby/types/restaurant";
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
      <div className="text-green-600 flex items-center space-x-2">
        <span>✅</span>
        <span>등록된 맛집입니다! 리뷰와 바로팟을 확인하세요.</span>
      </div>
    );
  }

  if (restaurantDetail && !isError) {
    return (
      <div className="text-green-600 flex items-center space-x-2">
        <span>✅</span>
        <span>등록된 맛집입니다! 리뷰와 바로팟을 확인하세요.</span>
      </div>
    );
  }

  return (
    <div className="text-orange-600 flex items-center space-x-2">
      <span>🆕</span>
      <span>새로운 맛집입니다! 첫 바로팟을 만들어보세요.</span>
    </div>
  );
};
