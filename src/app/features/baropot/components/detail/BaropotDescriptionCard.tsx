import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';

interface BaropotDescriptionCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotDescriptionCard({
  baropot,
}: BaropotDescriptionCardProps) {
  return (
    <motion.div
      className="mx-6 mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md">
          <span className="text-xl">💬</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">모임 소개</h3>
      </div>
      <p className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-base leading-relaxed text-gray-900">
        {baropot.description}
      </p>
    </motion.div>
  );
}
