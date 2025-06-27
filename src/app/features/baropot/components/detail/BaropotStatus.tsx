import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export default function BaropotStatus({ type }: { type: string }) {
  const router = useRouter();

  switch (type) {
    case "isLoading":
      return (
        <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="animate-spin w-12 h-12 border-4 border-[#1C4E80] border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-[#2B2B2B] font-medium">
              바로팟 정보를 불러오는 중...
            </p>
          </motion.div>
        </div>
      );
    case "isError":
      return (
        <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center px-4">
          <motion.div
            className="text-center bg-white rounded-2xl p-8 shadow-md max-w-sm w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">😔</span>
            </div>
            <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">
              바로팟을 찾을 수 없어요
            </h3>
            <p className="text-[#8A8A8A] text-sm mb-6">
              요청하신 바로팟이 존재하지 않거나 삭제되었습니다.
            </p>
            <button
              onClick={() => router.back()}
              className="w-full py-3 bg-[#1C4E80] text-white rounded-xl font-medium hover:bg-[#1a4373] transition-colors"
            >
              뒤로가기
            </button>
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}
