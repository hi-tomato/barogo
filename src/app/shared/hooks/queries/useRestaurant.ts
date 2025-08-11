import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { restaurantService } from '../../services/restaurantService';
import {
  RestaurantList,
  SearchQueries,
  UpdateRestaurantRequest,
} from '../../types/restaurant';
import { AxiosError } from 'axios';

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
    onSuccess: async (response) => {
      console.log('맛집 등록 성공! 서버 ID:', response.id);
      // 1. 모든 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.all,
      });
      //  2. 즉시 최신 데이터 다시 가져오기
      await queryClient.refetchQueries({
        queryKey: queryKeys.restaurant.list(),
        type: 'active',
      });

      //  3. 새 맛집 데이터를 상세 캐시에 저장
      queryClient.setQueryData(
        queryKeys.restaurant.detail(response.id),
        response
      );
    },
    onError: (error) => {
      console.error('맛집 등록 실패:', error);
    },
  });
};

export const useRestaurantDetail = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(restaurantId),
    queryFn: () => restaurantService.getDetail(restaurantId),
    enabled: !!restaurantId,
    throwOnError: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: (failureCount, error: unknown) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: number) =>
      restaurantService.delete(restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurant.list() });
    },
    onError: (error) => {
      console.error('맛집을 삭제하는데 문제가 발생하였습니다.' + error);
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
      restaurantId: number;
      data: UpdateRestaurantRequest;
    }) => restaurantService.update(restaurantId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error('맛집을 수정하는데 문제가 발생하였습니다.' + error);
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
