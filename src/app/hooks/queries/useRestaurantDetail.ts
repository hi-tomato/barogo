import { queryKeys } from "@/app/shared/lib/queryKeys";
import { restaurant } from "@/app/shared/services/mockapi";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantDetail = (kakaoId: string) => {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(kakaoId),
    queryFn: () => restaurant.getRestaurantDetail(kakaoId),
  });
};
