import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { restaurantService } from "../../services/restaurantService";
import { CreateRestaurantRequest } from "../../types/restaurant";

export const useRestaurantList = () => {
  return useQuery({
    queryKey: queryKeys.restaurant.list(),
    queryFn: restaurantService.getList,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantRequest) =>
      restaurantService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurant.list() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useRestaurantDetail = (restaurantId: string) => {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(restaurantId),
    queryFn: () => restaurantService.getDetail(restaurantId),
    enabled: !!restaurantId,
  });
};
