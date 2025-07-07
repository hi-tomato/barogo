import { queryKeys } from '@/app/shared/lib/queryKeys';
import { kakaoApiService } from '@/app/features/nearby/services/kakaoApi';
import { Location } from '@/app/shared/types';
import { useQuery } from '@tanstack/react-query';

export const useMockNearby = (location: Location | null) => {
  return useQuery({
    queryKey: location ? queryKeys.restaurant.nearby(location) : [],
    queryFn: () => kakaoApiService.getNearbyRestaurants(location as Location),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
