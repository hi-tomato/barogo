import { RestaurantDetail } from "@/app/features/nearby/types/restaurant";

interface getActionsProps {
  isLoading: boolean;
  isError: boolean;
  restaurantDetail: RestaurantDetail | null | undefined;
}

export const getActionButton = ({
  isLoading,
  isError,
  restaurantDetail,
}: getActionsProps) => {
  if (isLoading) return "확인 중...";
  if (restaurantDetail && !isError) return "맛집 상세보기";
  return "바로팟 만들기";
};

export const getActionButtonIcon = ({
  isLoading,
  isError,
  restaurantDetail,
}: getActionsProps) => {
  if (isLoading) return "⏳";
  if (restaurantDetail && !isError) return "🔍";
  return "⚡";
};
