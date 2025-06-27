import { motion } from "framer-motion";
import React from "react";
import { HiArrowLeft, HiHeart, HiShare } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function BaropotDetailHeader() {
  const router = useRouter();
  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm sticky top-0 z-40 border-b border-[#E6EEF5]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center px-4 py-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-xl transition-colors"
        >
          <HiArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
          바로팟 상세
        </h1>
        <div className="flex space-x-1">
          <button className="p-2 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-xl transition-colors">
            <HiHeart size={22} />
          </button>
          <button className="p-2 text-[#2B2B2B] hover:bg-[#E6EEF5] rounded-xl transition-colors">
            <HiShare size={22} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
