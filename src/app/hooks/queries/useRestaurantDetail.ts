import { queryKeys } from "@/app/lib/queryKeys";
import { restaurant } from "@/app/services/mockapi";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantDetail = (kakaoId: string) => {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(kakaoId),
    queryFn: () => restaurant.getRestaurantDetail(kakaoId),
  });
};
