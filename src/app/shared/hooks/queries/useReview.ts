import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { restaurantService } from "../../services/restaurantService";
import { CreateReviewRequest } from "../../types/restaurant";

export const useRestaurantReviews = (restaurantId: string) => {
  return useQuery({
    queryKey: queryKeys.restaurant.reviews(restaurantId),
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
      restaurantId: string;
      reviewData: CreateReviewRequest;
    }) => await restaurantService.createReview(restaurantId, reviewData),
    onSuccess: (data, variables) => {
      console.log("리뷰가 성공적으로 등록되어있습니다.", data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.reviews(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error("리뷰 등록 실패: ", error.message);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      restaurantId,
    }: {
      reviewId: string;
      restaurantId: string;
    }) => restaurantService.deleteReview(reviewId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.reviews(variables.restaurantId),
      });
      // 맛집 상세 정보도 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error("리뷰 삭제 실패:", error);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      restaurantId,
      reviewData,
    }: {
      reviewId: string;
      restaurantId: string;
      reviewData: CreateReviewRequest;
    }) => restaurantService.updateReview(reviewId, reviewData),
    onSuccess: (data, variables) => {
      console.log("리뷰가 성공적으로 수정되었습니다.", data);
      // 해당 맛집의 리뷰 목록 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.reviews(variables.restaurantId),
      });
      //  TODO: 맛집 상세 정보도 갱신
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurant.detail(variables.restaurantId),
      });
    },
    onError: (error) => {
      console.error("리뷰 수정 실패:", error);
    },
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: string) =>
      restaurantService.addBookmark(restaurantId),
    onSuccess: (data, restaurantId) => {
      console.log("북마크가 추가되었습니다.");
      console.log(restaurantId);
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
      console.error("북마크 추가 실패:", error);
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: string) =>
      restaurantService.removeBookmark(restaurantId),
    onSuccess: (data, restaurantId) => {
      console.log("북마크가 삭제되었습니다.");
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
      console.error("북마크 삭제 실패:", error);
    },
  });
};
