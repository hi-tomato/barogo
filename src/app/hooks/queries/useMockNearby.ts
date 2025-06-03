import { queryKeys } from "@/app/lib/queryKeys";
import { kakaoApiService } from "@/app/services/kakaoApi";
import { Location } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useMockNearby = (location: Location | null) => {
  // TODO: Type Error 고치기
  return useQuery({
    queryKey: location ? queryKeys.restaurant.nearby(location) : [],
    queryFn: () => kakaoApiService.getNearbyRestaurants(location),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
