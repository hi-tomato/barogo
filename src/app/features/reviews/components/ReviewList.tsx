import { Review } from '@/app/shared/types/restaurant';
import ReviewItem from './ReviewItem';
import { StateDisplay } from '@/app/shared/ui';

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  error: Error | null;
  currentUserId: number;
  restaurantId: number; // 추가
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
  restaurantId,
  onRetry,
  isDeleting,
}: ReviewListProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <StateDisplay
          state="loading"
          loadingMessage="리뷰를 불러오는 중..."
          size="lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <StateDisplay
          state="error"
          errorMessage="리뷰를 불러오는데 실패했습니다"
          onRetry={onRetry}
          size="lg"
        />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="px-4 py-6">
        <StateDisplay
          state="empty"
          emptyMessage="아직 리뷰가 없어요"
          emptyIcon="📝"
          size="lg"
        />
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
            restaurantId={restaurantId}
            isMyReview={review.userId === currentUserId}
            onDelete={() => onDeleteReview(review.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}
