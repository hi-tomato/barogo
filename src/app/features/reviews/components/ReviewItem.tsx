import { HiStar, HiTrash } from "react-icons/hi";
import { Review } from "@/app/shared/types/restaurant";
import Image from "next/image";

interface ReviewItemProps {
  review: Review;
  isMyReview: boolean;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function ReviewItem({
  review,
  isMyReview,
  onDelete,
  isDeleting,
}: ReviewItemProps) {
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

        {/* 삭제 버튼 (내 리뷰만) */}
        {isMyReview && (
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
            title="리뷰 삭제"
          >
            <HiTrash size={16} />
          </button>
        )}
      </div>

      {/* 리뷰 내용 */}
      <div className="bg-white rounded-lg p-3 ml-13">
        <p className="text-[#2B2B2B] leading-relaxed mb-3">{review.content}</p>

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
