"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import { FaHeartCircleCheck, FaHeartCircleXmark } from "react-icons/fa6";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/shared/hooks/queries/useReview";
import { useDeleteRestaurant } from "@/app/shared/hooks/queries/useRestaurant";
import { useRouter } from "next/navigation";
import EditRestaurantModal from "./EditRestaurantModal";

interface RestaurantActionsProps {
  restaurant: RestaurantDetail;
  isBookmarked?: boolean;
  isOwner?: boolean;
}

export default function RestaurantActions({
  restaurant,
  isBookmarked,
  isOwner,
}: RestaurantActionsProps) {
  const router = useRouter();
  const [showOwnerMenu, setShowOwnerMenu] = useState(false);
  const [bookmarked, setBookmarked] = useState(restaurant.isBookmarked);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();
  const deleteRestaurantMutation = useDeleteRestaurant();

  const handleBookmarkToggle = async () => {
    try {
      if (bookmarked) {
        await removeBookmarkMutation.mutateAsync(restaurant.id);
        setBookmarked(false);
      } else if (!bookmarked) {
        await addBookmarkMutation.mutateAsync(restaurant.id);
        setBookmarked(true);
      }
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
      alert("북마크 처리에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteDetail = () => {
    if (confirm("해당 맛집을 삭제하시겠습니까?")) {
      deleteRestaurantMutation.mutate(restaurant.id.toString());
      router.push("/main");
    }
  };

  const isBookmarkLoading =
    addBookmarkMutation.isPending || removeBookmarkMutation.isPending;

  return (
    <div className="flex items-center space-x-2 ml-4">
      {/* 북마크 버튼 */}
      <motion.button
        onClick={handleBookmarkToggle}
        disabled={isBookmarkLoading}
        className={`p-3 rounded-full border-2 transition-all relative ${
          isBookmarked
            ? "bg-red-50 border-red-200 text-red-500"
            : "bg-gray-50 border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
        } ${isBookmarkLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        whileHover={!isBookmarkLoading ? { scale: 1.1 } : {}}
        whileTap={!isBookmarkLoading ? { scale: 0.9 } : {}}
      >
        {bookmarked ? (
          <FaHeartCircleCheck
            className="cursor-pointer text-red-400"
            size={26}
          />
        ) : (
          <FaHeartCircleXmark className="cursor-pointer" size={26} />
        )}
      </motion.button>

      {/* 소유자 메뉴 */}
      {isOwner && (
        <div className="relative">
          <motion.button
            onClick={() => setShowOwnerMenu(!showOwnerMenu)}
            className="p-3 rounded-full bg-orange-50 border-2 border-orange-200 text-orange-500 hover:bg-orange-100 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiDotsVertical size={20} />
          </motion.button>

          {showOwnerMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute right-0 top-14 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[140px] z-50"
            >
              <button
                onClick={() => {
                  setShowOwnerMenu(true);
                  setIsEditModalOpen(true);
                }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
              >
                <HiPencil size={16} />
                <span>정보 수정</span>
              </button>
              {isEditModalOpen && (
                <EditRestaurantModal
                  restaurant={restaurant}
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                />
              )}
              <button
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                onClick={handleDeleteDetail}
              >
                <HiTrash size={16} /> <span>맛집 삭제</span>
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
