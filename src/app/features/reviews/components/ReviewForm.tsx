import { useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { CreateReviewRequest } from "@/app/shared/types/restaurant";
import PhotoUploader from "./PhotoUploader";
import ImageUploader from "@/app/shared/components/ImageUploader";

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
  const [reviewContent, setReviewContent] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!rating || !reviewContent.trim()) {
      alert("별점과 리뷰 내용을 모두 입력해주세요!");
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
    setReviewContent("");
    setUploadedUrls([]);
  };

  return (
    <div className="px-4 py-6 bg-gradient-to-r from-[#E6EEF5] to-[#F8F9FA] border-b border-gray-100">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-[#2B2B2B] mb-4 flex items-center">
          <span className="mr-2">⭐</span>새 리뷰 작성
        </h3>

        {/* 별점 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            별점을 선택해주세요
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1 hover:scale-110 transition-transform"
                disabled={isSubmitting}
              >
                {star <= rating ? (
                  <HiStar className="w-7 h-7 text-yellow-400" />
                ) : (
                  <HiOutlineStar className="w-7 h-7 text-gray-300 hover:text-yellow-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            리뷰 내용
          </label>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="맛, 서비스, 분위기 등 자유롭게 작성해주세요 ✨"
            rows={4}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent resize-none placeholder:text-[#8A8A8A] disabled:opacity-50"
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
        <div className="flex space-x-3 mt-4">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>등록 중...</span>
              </div>
            ) : (
              "리뷰 등록하기"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
