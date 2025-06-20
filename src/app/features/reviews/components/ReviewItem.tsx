import { HiStar, HiTrash } from "react-icons/hi";
import { Review } from "@/app/shared/types/restaurant";
import Image from "next/image";
import { BiCheck, BiEdit, BiX } from "react-icons/bi";
import { useUpdateReview } from "@/app/shared/hooks/queries/useReview";
import { useState } from "react";

interface ReviewItemProps {
  review: Review;
  isMyReview: boolean;
  onDelete: () => void;
  isDeleting: boolean;
  restaurantId: string;
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

  // TODO: 수정하기
  const updateReviewMutate = useUpdateReview();
  const handleEdit = async () => {
    try {
      await updateReviewMutate.mutateAsync({
        reviewId: review.id.toString(),
        restaurantId: restaurantId,
        reviewData: newData,
      });
      setIsEditing(false);
      alert("리뷰가 수정되었습니다! 🎉");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
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
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* 아바타 */}
          <div className="w-10 h-10 bg-gradient-to-br from-[#1C4E80] to-[#2563eb] rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">
              {review.userName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-[#2B2B2B]">
                {review.userName}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-200"
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
                  className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50"
                  title="수정 완료"
                >
                  <BiCheck size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                  title="수정 취소"
                >
                  <BiX size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleStartEdit}
                  className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="리뷰 수정"
                >
                  <BiEdit size={16} />
                </button>
                <button
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
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
      <div className="bg-white rounded-lg p-3 ml-13">
        {isEditing ? (
          <textarea
            value={newData.content}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, content: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="리뷰 내용을 입력하세요..."
          />
        ) : (
          <p className="text-[#2B2B2B] leading-relaxed mb-3">
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
                className="object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open(photo, "_blank")}
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
