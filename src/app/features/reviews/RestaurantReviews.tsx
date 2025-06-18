"use client";
import { useState } from "react";
import {
  useCreateReviews,
  useDeleteReview,
  useRestaurantReviews,
} from "@/app/shared/hooks/queries/useReview";
import { CreateReviewRequest, Review } from "@/app/shared/types/restaurant";
import ReviewHeader from "./components/ReviewHeader";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

interface RestaurantReviewsProps {
  restaurantId: string;
  currentUserId?: number;
}

export default function RestaurantReviews({
  restaurantId,
  currentUserId = 1,
}: RestaurantReviewsProps) {
  const [showWriteForm, setShowWriteForm] = useState(false);
  // 전체 리뷰 데이터를 받아오는 Query
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useRestaurantReviews(restaurantId);
  console.log(reviewsData);

  // 리뷰를 수정, 삭제하는 Query
  const createReviewMutation = useCreateReviews();
  const deleteReviewMutation = useDeleteReview();

  const reviews: Review[] = (() => {
    if (!reviewsData) return [];
    if (Array.isArray(reviewsData.reviews)) {
      return reviewsData.reviews;
    }
    if (Array.isArray(reviewsData)) {
      return reviewsData;
    }
    return [];
  })();

  // TODO: 내 리뷰인지 확인
  const isMyReview = (review: Review) => review.userId === currentUserId;

  const handleSubmitReview = async (reviewData: CreateReviewRequest) => {
    try {
      await createReviewMutation.mutateAsync({
        restaurantId,
        reviewData,
      });
      setShowWriteForm(false);
      alert("리뷰가 등록되었습니다! 🎉");
      refetchReviews();
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteReviewMutation.mutateAsync({
        reviewId: reviewId.toString(),
        restaurantId,
      });
      alert("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-white">
      {/* 리뷰 헤더 */}
      <ReviewHeader
        reviewCount={reviews.length}
        showWriteForm={showWriteForm}
        onToggleForm={() => setShowWriteForm(!showWriteForm)}
        isSubmitting={createReviewMutation.isPending}
      />
      {/* 리뷰 작성 폼 */}
      {showWriteForm && (
        <ReviewForm
          onSubmit={handleSubmitReview}
          onCancel={() => setShowWriteForm(false)}
          isSubmitting={createReviewMutation.isPending}
        />
      )}
      {/* 리뷰 목록 */}
      <ReviewList
        reviews={reviews}
        isLoading={reviewsLoading}
        error={reviewsError}
        currentUserId={currentUserId}
        onDeleteReview={handleDeleteReview}
        onRetry={() => refetchReviews()}
        isDeleting={deleteReviewMutation.isPending}
      />
    </div>
  );
}
