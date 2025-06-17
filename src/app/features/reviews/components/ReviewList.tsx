import { Review } from "@/app/shared/types/restaurant";
import ReviewItem from "./ReviewItem";
// import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  error: any;
  currentUserId: number;
  onDeleteReview: (reviewId: number) => void;
  onRetry: () => void;
  isDeleting: boolean;
}

export default function ReviewList({
  reviews,
  isLoading,
  error,
  currentUserId,
  onDeleteReview,
  onRetry,
  isDeleting,
}: ReviewListProps) {
  const isMyReview = (review: Review) => review.userId === currentUserId;

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">😞</div>
          <p className="text-red-500 mb-2">리뷰를 불러오는데 실패했습니다</p>
          <button onClick={onRetry} className="text-blue-500 hover:underline">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            아직 리뷰가 없어요
          </h3>
          <p className="text-sm text-gray-500">첫 번째 리뷰를 남겨보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            isMyReview={isMyReview(review)}
            onDelete={() => onDeleteReview(review.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}
