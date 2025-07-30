'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiDotsVertical, HiPencil, HiTrash } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { FaHeartCircleCheck, FaHeartCircleXmark } from 'react-icons/fa6';
import {
  useAddBookmark,
  useRemoveBookmark,
} from '@/app/shared/hooks/queries/useReview';
import { useDeleteRestaurant } from '@/app/shared/hooks/queries/useRestaurant';
import { useRouter } from 'next/navigation';
import EditRestaurantModal from './EditRestaurantModal';
import { useToast } from '@/app/shared/hooks/useToast';

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
  const toast = useToast();

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
      console.error('북마크 처리 중 오류:', error);
      toast.error('북마크 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteDetail = () => {
    // TODO: 확인 모달 추가 필요
    if (confirm('해당 맛집을 삭제하시겠습니까?')) {
      deleteRestaurantMutation.mutate(restaurant.id);
      router.push('/main');
    }
  };

  const isBookmarkLoading =
    addBookmarkMutation.isPending || removeBookmarkMutation.isPending;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-4 py-6">
        <motion.button
          onClick={handleBookmarkToggle}
          disabled={isBookmarkLoading}
          className={`relative rounded-full border-2 p-3 transition-all ${
            isBookmarked
              ? 'border-red-200 bg-red-50 text-red-500'
              : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-red-200 hover:text-red-400'
          } ${isBookmarkLoading ? 'cursor-not-allowed opacity-50' : ''}`}
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
              className="rounded-full border-2 border-orange-200 bg-orange-50 p-3 text-orange-500 transition-all hover:bg-orange-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiDotsVertical size={20} />
            </motion.button>

            {showOwnerMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute top-14 right-0 z-50 min-w-[140px] rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
              >
                <button
                  onClick={() => {
                    setShowOwnerMenu(true);
                    setIsEditModalOpen(true);
                  }}
                  className="flex w-full items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
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
                  className="flex w-full items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                  onClick={handleDeleteDetail}
                >
                  <HiTrash size={16} /> <span>맛집 삭제</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* 여기에 다른 컨텐츠가 있다면 추가 */}
    </div>
  );
}
