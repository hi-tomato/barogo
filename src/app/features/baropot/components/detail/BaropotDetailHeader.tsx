import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowLeft, HiHeart, HiShare } from "react-icons/hi";
import { useParams, useRouter } from "next/navigation";
import Button from "@/app/shared/ui/Button";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/shared/hooks/queries/useReview";

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
        title: "바로팟 공유",
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-[#E6EEF5]/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-full transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowLeft size={20} />
        </motion.button>

        <motion.h1
          className="text-lg font-bold text-[#2B2B2B] tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          바로팟 상세
        </motion.h1>

        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isBookmarked
                  ? "bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg"
                  : "text-[#2B2B2B] hover:bg-[#E6EEF5]"
              }`}
              onClick={handleToggleBookmark}
            >
              <HiHeart
                size={20}
                className={`transition-all duration-300 ${
                  isBookmarked ? "fill-current animate-pulse" : ""
                }`}
              />
              {isBookmarked && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={handleToggleBookmark}
                />
              )}
            </Button>
          </motion.div>

          <motion.button
            onClick={handleShare}
            className="flex items-center justify-center w-10 h-10 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-full transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiShare size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
