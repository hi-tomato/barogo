import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { restaurantService } from '../../services/restaurantService';
import { CreateReviewRequest } from '../../types/restaurant';

export const useRestaurantReviews = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.restaurant.review(restaurantId),
    queryFn: () => restaurantService.getReviews(restaurantId),
    enabled: !!restaurantId,
    staleTime: 1000 * 6 * 2,
  });
};

export const useCreateReviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      restaurantId,
      reviewData,
    }: {
      restaurantId: number;
      reviewData: CreateReviewRequest;
    }) => await restaurantService.createReview(restaurantId, reviewData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.review(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error('리뷰 등록 실패: ', error.message);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: number; restaurantId: number }) =>
      restaurantService.deleteReview(reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.review(variables.restaurantId),
      });
      // 맛집 상세 정보도 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      reviewData,
    }: {
      reviewId: number;
      restaurantId: number;
      reviewData: CreateReviewRequest;
    }) => restaurantService.updateReview(reviewId, reviewData),
    onSuccess: (data, variables) => {
      // 해당 맛집의 리뷰 목록 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.review(variables.restaurantId),
      });
      //  TODO: 맛집 상세 정보도 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error('리뷰 수정 실패:', error);
    },
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: number) =>
      restaurantService.addBookmark(restaurantId),
    onSuccess: (_, restaurantId) => {
      // 맛집 상세 정보 갱신 (북마크 상태 변경)
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(restaurantId),
      });
      // 북마크 목록도 갱신 (있다면)
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.bookmarks(),
      });
    },
    onError: (error) => {
      console.error('북마크 추가 실패:', error);
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: number) =>
      restaurantService.removeBookmark(restaurantId),
    onSuccess: (_, restaurantId) => {
      // 맛집 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(restaurantId),
      });
      // 북마크 목록도 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.bookmarks(),
      });
    },
    onError: (error) => {
      console.error('북마크 삭제 실패:', error);
    },
  });
};
