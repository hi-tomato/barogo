import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';
import { HiUsers } from 'react-icons/hi';

interface BaropotConditionsCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotConditionsCard({
  baropot,
}: BaropotConditionsCardProps) {
  const conditions = [
    { label: '연령대', value: baropot.participantAgeGroup, icon: '👥' },
    {
      label: '참가 성별',
      value: baropot.participantGender,
      icon: '⚖️',
    },
    { label: '결제 방식', value: baropot.paymentMethod, icon: '💳' },
  ];

  return (
    <motion.div
      className="mx-6 mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
          <HiUsers className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">참가 조건</h3>
      </div>

      <div className="space-y-3">
        {conditions.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <span className="font-bold text-gray-900">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
