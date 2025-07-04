import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";

interface BaropotDescriptionCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotDescriptionCard({
  baropot,
}: BaropotDescriptionCardProps) {
  return (
    <motion.div
      className="mt-6 bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-8 shadow-lg border border-white/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="font-bold text-[#2B2B2B] text-2xl">모임 소개</h3>
      </div>
      <p className="text-[#2B2B2B] leading-relaxed text-lg bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] p-6 rounded-2xl">
        {baropot.description}
      </p>
    </motion.div>
  );
}
