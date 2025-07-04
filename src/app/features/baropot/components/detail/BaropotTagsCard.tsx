import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import { Card } from "@/app/shared/ui";

interface BaropotTagsCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotTagsCard({ baropot }: BaropotTagsCardProps) {
  if (!baropot.tags || baropot.tags.length === 0) {
    return null;
  }

  return (
    <Card
      variant="gradient"
      size="lg"
      padding="lg"
      className="mt-6"
      animate={true}
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">🏷️</span>
        </div>
        <h3 className="font-bold text-[#2B2B2B] text-2xl">관련 태그</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {baropot.tags.map((tag, index) => (
          <motion.span
            key={index}
            className="px-6 py-3 bg-gradient-to-r from-[#1C4E80] via-[#2563eb] to-[#6366F1] text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            #{tag}
          </motion.span>
        ))}
      </div>
    </Card>
  );
}
