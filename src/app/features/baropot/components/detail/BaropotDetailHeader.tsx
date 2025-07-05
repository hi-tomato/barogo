import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiHeart, HiShare } from 'react-icons/hi';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/app/shared/ui';
import {
  useAddBookmark,
  useRemoveBookmark,
} from '@/app/shared/hooks/queries/useReview';

export default function BaropotDetailHeader() {
  const router = useRouter();
  const params = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const baropotId = Number(params.baropotId);
  const addBookmarkMutation = useAddBookmark();
  const deleteBookmarkMutation = useRemoveBookmark();

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      deleteBookmarkMutation.mutate(baropotId, {
        onSuccess: () => {
          setIsBookmarked(false); // 상태 업데이트
        },
      });
    } else {
      addBookmarkMutation.mutate(baropotId, {
        onSuccess: () => {
          setIsBookmarked(true); // 상태 업데이트
        },
      });
    }
  };

  const handleShare = () => {
    // TODO: 공유 기능
    if (navigator.share) {
      navigator.share({
        title: '바로팟 공유',
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      className="sticky top-0 z-50 border-b border-[#E6EEF5]/50 bg-white/95 backdrop-blur-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <motion.button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#2B2B2B] transition-all duration-200 hover:bg-[#E6EEF5]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowLeft size={20} />
        </motion.button>

        <motion.h1
          className="text-lg font-bold tracking-tight text-[#2B2B2B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          바로팟 상세
        </motion.h1>

        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              icon={<HiHeart size={20} />}
              variant={isBookmarked ? 'gradient' : 'outline'}
              size="icon"
              className={`relative transition-all duration-300 ${
                isBookmarked
                  ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg'
                  : 'text-[#2B2B2B] hover:bg-[#E6EEF5]'
              }`}
              onClick={handleToggleBookmark}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              icon={<HiShare size={20} />}
              variant="outline"
              size="icon"
              className="text-[#2B2B2B] hover:bg-[#E6EEF5]"
              onClick={handleShare}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
