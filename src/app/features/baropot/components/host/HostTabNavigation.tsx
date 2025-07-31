import { motion } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

interface HostTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pendingCount: number;
  approvedCount: number;
}

export function HostTabNavigation({
  activeTab,
  onTabChange,
  pendingCount,
  approvedCount,
}: HostTabNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => onTabChange('pending')}
          className={`flex-1 rounded-md px-4 py-3 text-sm font-medium transition-all ${
            activeTab === 'pending'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <HiExclamationCircle size={16} />
            <span>대기중 ({pendingCount})</span>
          </div>
        </button>
        <button
          onClick={() => onTabChange('approved')}
          className={`flex-1 rounded-md px-4 py-3 text-sm font-medium transition-all ${
            activeTab === 'approved'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <HiCheckCircle size={16} />
            <span>승인됨 ({approvedCount})</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
