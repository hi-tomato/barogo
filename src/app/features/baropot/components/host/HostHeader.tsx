import { motion } from "framer-motion";
import { HiUsers, HiX } from "react-icons/hi";

export function HostHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1C4E80] rounded-xl flex items-center justify-center">
            <HiUsers className="text-white text-lg" />
          </div>
          <div>
            <h3 className="font-bold text-[#2B2B2B] text-lg">호스트 관리</h3>
            <p className="text-sm text-[#8A8A8A]">
              참가 신청을 관리하고 바로팟 상태를 변경하세요
            </p>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HiX className="text-gray-500" />
        </motion.button>
      </div>
    </div>
  );
}
