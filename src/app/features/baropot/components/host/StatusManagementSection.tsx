import { statusOptions } from "@/app/shared/lib/baropotOptions";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { BaropotStatus } from "@/app/shared/types/enums";
import { motion } from "framer-motion";
import { HiClock } from "react-icons/hi";

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
      className="bg-white rounded-2xl p-6 shadow-sm border border-white/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h4 className="font-semibold text-[#2B2B2B] mb-4 flex items-center text-lg">
        <HiClock className="mr-2 text-[#1C4E80]" />
        바로팟 상태 관리
      </h4>

      <div className="grid grid-cols-2 gap-3">
        {statusOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            disabled={isPending}
            className={`p-4 rounded-xl text-center transition-all border-2 disabled:opacity-50 ${
              baropot.status === option.value
                ? `${option.color} text-white border-transparent shadow-lg`
                : `${option.bgColor} ${option.textColor} border-transparent hover:shadow-md`
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xl mb-2">{option.icon}</div>
            <div className="text-sm font-semibold">{option.label}</div>
          </motion.button>
        ))}
      </div>

      {isPending && (
        <motion.div
          className="mt-4 text-center text-sm text-[#1C4E80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          상태 변경 중...
        </motion.div>
      )}
    </motion.div>
  );
}
