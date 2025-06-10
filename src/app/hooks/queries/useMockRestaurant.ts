import { queryKeys } from "@/app/shared/lib/queryKeys";
import { restaurant } from "@/app/shared/services/mockapi";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteRestaurants = () => {
  return useQuery({
    queryKey: queryKeys.restaurant.favorites(),
    queryFn: restaurant.getFavorites,
    staleTime: 1000 * 60 * 5,
  });
};
