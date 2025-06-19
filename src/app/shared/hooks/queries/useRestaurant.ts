import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { restaurantService } from "../../services/restaurantService";
import {
  CreateRestaurantRequest,
  RestaurantList,
} from "../../types/restaurant";

export const useRestaurantList = () => {
  return useQuery({
    queryKey: queryKeys.restaurant.list(),
    queryFn: () => restaurantService.search(""),
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantRequest) =>
      restaurantService.create(data),
    onSuccess: (data) => {
      console.log("성공적으로 데이터를 서버에 저장하였습니다.", data);
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
    throwOnError: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: string) =>
      restaurantService.delete(restaurantId),
    onSuccess: () => {
      console.log("맛집을 삭제하였습니다.");
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurant.list() });
    },
    onError: (error) => {
      console.error("맛집을 삭제하는데 문제가 발생하였습니다." + error);
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      data,
    }: {
      restaurantId: string;
      data: CreateRestaurantRequest;
    }) => restaurantService.update(restaurantId, data),
    onSuccess: (data, variables) => {
      console.log("맛집을 수정하였습니다.", data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error("맛집을 수정하는데 문제가 발생하였습니다." + error);
    },
  });
};

export const useGetBookMarks = () => {
  return useQuery<RestaurantList>({
    queryKey: queryKeys.restaurant.bookmarks(),
    queryFn: () => restaurantService.getBookMarkList(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
