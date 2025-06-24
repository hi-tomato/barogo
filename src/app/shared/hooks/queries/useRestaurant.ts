import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { restaurantService } from "../../services/restaurantService";
import {
  RestaurantList,
  SearchQueries,
  UpdateRestaurantRequest,
} from "../../types/restaurant";

export const useRestaurantList = (query?: SearchQueries) => {
  return useQuery({
    queryKey: queryKeys.restaurant.list?.(query),
    queryFn: () => restaurantService.search(query),
    enabled: true,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantService.create,
    onSuccess: (response) => {
      console.log("맛집 등록 성공! 서버 ID:", response.id);

      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.all,
      });
    },
    onError: (error) => {
      console.error("맛집 등록 실패:", error);
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
      data: UpdateRestaurantRequest;
    }) => restaurantService.update(restaurantId, data),
    onSuccess: (data, variables) => {
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
