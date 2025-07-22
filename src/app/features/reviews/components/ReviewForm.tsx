import { useState } from 'react';
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import { CreateReviewRequest } from '@/app/shared/types/restaurant';
import PhotoUploader from './PhotoUploader';
import ImageUploader from '@/app/shared/components/ImageUploader';
import { LoadingSpinner } from '@/app/shared/ui';
import { useToast } from '@/app/shared/hooks/useToast';

interface ReviewFormProps {
  onSubmit: (reviewData: CreateReviewRequest) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ReviewForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!rating || !reviewContent.trim()) {
      toast.error('별점과 리뷰 내용을 모두 입력해주세요!');
      return;
    }

    // Server로 보낼 리뷰 데이터
    const reviewData: CreateReviewRequest = {
      rating,
      content: reviewContent.trim(),
      photos: uploadedUrls,
    };
    await onSubmit(reviewData);

    // Reset
    setRating(0);
    setReviewContent('');
    setUploadedUrls([]);
  };

  return (
    <div className="border-b border-gray-100 bg-gradient-to-r from-[#E6EEF5] to-[#F8F9FA] px-4 py-6">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-4 flex items-center font-semibold text-[#2B2B2B]">
          <span className="mr-2">⭐</span>새 리뷰 작성
        </h3>

        {/* 별점 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            별점을 선택해주세요
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110"
                disabled={isSubmitting}
              >
                {star <= rating ? (
                  <HiStar className="h-7 w-7 text-yellow-400" />
                ) : (
                  <HiOutlineStar className="h-7 w-7 text-gray-300 hover:text-yellow-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            리뷰 내용
          </label>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="맛, 서비스, 분위기 등 자유롭게 작성해주세요 ✨"
            rows={4}
            disabled={isSubmitting}
            className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 placeholder:text-[#8A8A8A] focus:border-transparent focus:ring-2 focus:ring-[#1C4E80] focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* 사진 업로드 */}
        <ImageUploader
          onImagesChange={setUploadedUrls}
          layout="horizontal"
          maxFiles={3}
          disabled={isSubmitting}
        />

        {/* 버튼들 */}
        <div className="mt-4 flex space-x-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-gradient-to-r from-[#1C4E80] to-[#2563eb] py-3 font-medium text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" color="white" inline />
                <span>등록 중...</span>
              </div>
            ) : (
              '리뷰 등록하기'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
