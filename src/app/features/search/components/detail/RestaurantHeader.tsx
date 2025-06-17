"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiHeart,
  HiOutlineHeart,
  HiShare,
  HiDotsVertical,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import Button from "@/app/shared/ui/Button";

interface RestaurantHeaderProps {
  restaurantName?: string;
  isBookmarked?: boolean;
  isOwner?: boolean;
  onBookmarkToggle?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function RestaurantHeader({
  restaurantName = "맛집 상세",
  isBookmarked = false,
  isOwner = false,
  onBookmarkToggle,
  onShare,
  onEdit,
  onDelete,
}: RestaurantHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleBookmark = () => {
    onBookmarkToggle?.();
    // 북마크 애니메이션 효과
  };

  const handleShare = () => {
    onShare?.();
    // 공유 기능
    if (navigator.share) {
      navigator.share({
        title: restaurantName,
        text: `${restaurantName} 맛집 정보를 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      // 폴백: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 뒤로가기 버튼 */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              text=""
              onClick={() => router.back()}
              icon={<HiArrowLeft size={20} />}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            />
          </motion.div>

          {/* 제목 */}
          <div className="flex-1 text-center">
            <motion.h1
              className="text-lg font-semibold text-[#2B2B2B] truncate max-w-[200px] mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {restaurantName}
            </motion.h1>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-2">
            {/* 북마크 버튼 */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                text=""
                onClick={handleBookmark}
                icon={
                  isBookmarked ? (
                    <HiHeart size={20} className="text-red-500" />
                  ) : (
                    <HiOutlineHeart size={20} className="text-gray-600" />
                  )
                }
                className={`p-2 rounded-lg transition-all ${
                  isBookmarked
                    ? "bg-red-50 hover:bg-red-100"
                    : "hover:bg-gray-100"
                }`}
              />
            </motion.div>

            {/* 공유 버튼 */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                text=""
                onClick={handleShare}
                icon={<HiShare size={20} />}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
