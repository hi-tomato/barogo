"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import Button from "@/app/shared/ui/Button";

interface RestaurantHeaderProps {
  restaurantName?: string;
}

export default function RestaurantHeader({
  restaurantName = "맛집 상세",
}: RestaurantHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

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
        </div>
      </div>
    </motion.header>
  );
}
