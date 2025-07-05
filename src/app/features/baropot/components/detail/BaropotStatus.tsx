import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BaropotStatus({ type }: { type: string }) {
  const router = useRouter();

  switch (type) {
    case 'isLoading':
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[#1C4E80] border-t-transparent"></div>
            <p className="font-medium text-[#2B2B2B]">
              바로팟 정보를 불러오는 중...
            </p>
          </motion.div>
        </div>
      );
    case 'isError':
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5] px-4">
          <motion.div
            className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl">😔</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">
              바로팟을 찾을 수 없어요
            </h3>
            <p className="mb-6 text-sm text-[#8A8A8A]">
              요청하신 바로팟이 존재하지 않거나 삭제되었습니다.
            </p>
            <button
              onClick={() => router.back()}
              className="w-full rounded-xl bg-[#1C4E80] py-3 font-medium text-white transition-colors hover:bg-[#1a4373]"
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
