import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';

interface BaropotTagsCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotTagsCard({ baropot }: BaropotTagsCardProps) {
  if (!baropot.tags || baropot.tags.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="mx-6 mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-md">
          <span className="text-xl">🏷️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">관련 태그</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {baropot.tags.map((tag, index) => (
          <motion.span
            key={index}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            #{tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
