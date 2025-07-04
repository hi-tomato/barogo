"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiDotsVertical } from "react-icons/hi";
import Button from "./Button";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
  rightContent?: React.ReactNode;
  className?: string;
  variant?: "default" | "transparent" | "gradient";
}

const headerVariants = {
  default: "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm",
  transparent: "bg-transparent",
  gradient: "bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white",
};

export default function Header({
  title,
  showBack = true,
  showMenu = false,
  onMenuClick,
  rightContent,
  className = "",
  variant = "default",
}: HeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-40 ${headerVariants[variant]} ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* 왼쪽 영역 */}
        <div className="flex items-center space-x-3">
          {showBack && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                icon="back"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                뒤로
              </Button>
            </motion.div>
          )}
        </div>

        {/* 중앙 제목 */}
        <div className="flex-1 text-center">
          <motion.h1
            className={`text-lg font-semibold truncate max-w-[200px] mx-auto ${
              variant === "gradient" ? "text-white" : "text-[#2B2B2B]"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex items-center space-x-2">
          {rightContent}
          {showMenu && onMenuClick && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={onMenuClick}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiDotsVertical size={20} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
