import { queryKeys } from "@/app/shared/lib/queryKeys";
import { restaurant } from "@/app/shared/services/mockapi";
import { useQuery } from "@tanstack/react-query";

export const useRestaurantDetail = (
  kakaoId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(kakaoId),
    queryFn: () => restaurant.getRestaurantDetail(kakaoId),
    enabled: enabled && !!kakaoId,
    throwOnError: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
