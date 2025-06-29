import { motion } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

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
      <div className="flex bg-white rounded-xl p-1 shadow-sm">
        <button
          onClick={() => onTabChange("pending")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "pending"
              ? "bg-[#1C4E80] text-white shadow-md"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <HiExclamationCircle size={16} />
            <span>대기중 ({pendingCount})</span>
          </div>
        </button>
        <button
          onClick={() => onTabChange("approved")}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "approved"
              ? "bg-[#1C4E80] text-white shadow-md"
              : "text-gray-600 hover:text-gray-800"
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
