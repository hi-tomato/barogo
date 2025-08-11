import { HiStar, HiTrash } from 'react-icons/hi';
import { Review } from '@/app/shared/types/restaurant';
import Image from 'next/image';
import { BiCheck, BiEdit, BiX } from 'react-icons/bi';
import { useUpdateReview } from '@/app/shared/hooks/queries/useReview';
import { useState } from 'react';
import { useToast } from '@/app/shared/hooks/useToast';

interface ReviewItemProps {
  review: Review;
  isMyReview: boolean;
  onDelete: () => void;
  isDeleting: boolean;
  restaurantId: number;
}

export default function ReviewItem({
  review,
  isMyReview,
  onDelete,
  isDeleting,
  restaurantId,
}: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    content: review.content,
    rating: review.rating,
    photos: review.photos || [],
  });
  const toast = useToast();
  // TODO: 수정하기
  const updateReviewMutate = useUpdateReview();
  const handleEdit = async () => {
    try {
      await updateReviewMutate.mutateAsync({
        reviewId: review.id,
        restaurantId: restaurantId,
        reviewData: newData,
      });
      setIsEditing(false);
      toast.success('리뷰가 수정되었습니다! 🎉');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      toast.error('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelEdit = () => {
    setNewData({
      content: review.content,
      rating: review.rating,
      photos: review.photos || [],
    });
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="rounded-xl bg-gray-50 p-4 transition-shadow hover:shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {/* 아바타 */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1C4E80] to-[#2563eb] shadow-sm">
            <span className="text-sm font-bold text-white">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-[#2B2B2B]">
                {review.userName}
              </span>
            </div>
            <div className="mt-1 flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 수정 버튼 */}
        {isMyReview && (
          <div className="flex space-x-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  disabled={updateReviewMutate.isPending}
                  className="rounded-lg p-2 text-green-400 transition-all hover:bg-green-50 hover:text-green-600 disabled:opacity-50"
                  title="수정 완료"
                >
                  <BiCheck size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600"
                  title="수정 취소"
                >
                  <BiX size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleStartEdit}
                  className="rounded-lg p-2 text-blue-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                  title="리뷰 수정"
                >
                  <BiEdit size={16} />
                </button>
                <button
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="rounded-lg p-2 text-red-400 transition-all hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  title="리뷰 삭제"
                >
                  <HiTrash size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* 리뷰 내용 */}
      <div className="ml-13 rounded-lg bg-white p-3">
        {isEditing ? (
          <textarea
            value={newData.content}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, content: e.target.value }))
            }
            className="w-full resize-none rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="리뷰 내용을 입력하세요..."
          />
        ) : (
          <p className="mb-3 leading-relaxed text-[#2B2B2B]">
            {review.content}
          </p>
        )}

        {/* 사진들 */}
        {review.photos && review.photos.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto">
            {review.photos.map((photo, photoIndex) => (
              <Image
                key={photoIndex}
                src={photo}
                alt={`Review photo ${photoIndex + 1}`}
                className="flex-shrink-0 cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-80"
                onClick={() => window.open(photo, '_blank')}
                width={24}
                height={24}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
