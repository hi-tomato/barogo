import { motion } from "framer-motion";
import { HiCog } from "react-icons/hi";

interface HostManagementButtonProps {
  onClick: () => void;
}

export function HostManagementButton({ onClick }: HostManagementButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-36 right-6 w-14 h-14 bg-[#1C4E80] rounded-full shadow-lg flex items-center justify-center z-499999"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 10px 30px rgba(28, 78, 128, 0.3)",
        backgroundColor: "#153a5f",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <HiCog className="text-white text-xl" />
    </motion.button>
  );
}
