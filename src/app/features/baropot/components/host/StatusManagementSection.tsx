import { statusOptions } from '@/app/shared/lib/baropotOptions';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { BaropotStatus } from '@/app/shared/types/enums';
import { motion } from 'framer-motion';
import { HiClock } from 'react-icons/hi';

interface StatusManagementSectionProps {
  baropot: BaropotDetailResponse;
  onStatusChange: (status: BaropotStatus) => void;
  isPending: boolean;
}

export function StatusManagementSection({
  baropot,
  onStatusChange,
  isPending,
}: StatusManagementSectionProps) {
  return (
    <motion.div
      className="rounded-xl border border-gray-100 bg-gray-50 p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h4 className="mb-4 flex items-center text-base font-medium text-gray-900">
        <HiClock className="mr-2 text-blue-600" />
        바로팟 상태 관리
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {statusOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            disabled={isPending}
            className={`rounded-lg border p-4 text-center transition-all disabled:opacity-50 ${
              baropot.status === option.value
                ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-sm'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="mb-1 text-lg">{option.icon}</div>
            <div className="text-sm font-medium">{option.label}</div>
          </motion.button>
        ))}
      </div>

      {isPending && (
        <motion.div
          className="mt-4 text-center text-sm text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          상태 변경 중...
        </motion.div>
      )}
    </motion.div>
  );
}
