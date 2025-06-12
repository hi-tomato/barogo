"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SignupSuccessModalProps {
  isOpen: boolean;
  userName?: string;
}
export default function SignUpSuccessModal({
  isOpen,
  userName = "새로운 맛집러",
}: SignupSuccessModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 축하 아이콘 */}
        <motion.div
          className="text-6xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          🎉
        </motion.div>

        {/* 제목 */}
        <motion.h2
          className="text-2xl font-bold text-[#1C4E80] mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          환영합니다!
        </motion.h2>

        {/* 메시지 */}
        <motion.div
          className="space-y-2 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#2B2B2B] font-medium">
            {userName}님의 회원가입이 완료되었어요!
          </p>
          <p className="text-sm text-[#8A8A8A]">
            이제 바로고에서 새로운 맛집 친구들과
            <br />
            즐거운 식사를 시작해보세요! 🍽️
          </p>
        </motion.div>

        {/* 버튼 */}
        <motion.button
          onClick={() => router.push("/login")}
          className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          로그인하러 가기
        </motion.button>

        {/* 장식 요소 */}
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2 text-2xl"
          animate={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🌟
        </motion.div>
      </motion.div>
    </div>
  );
}
