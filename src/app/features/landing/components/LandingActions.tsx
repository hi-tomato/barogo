'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { itemVariants } from '@/app/shared/lib/animation';

export default function LandingActions() {
  const router = useRouter();

  return (
    <motion.div className="w-full max-w-sm space-y-4" variants={itemVariants}>
      <motion.button
        onClick={() => router.push('/login')}
        className="w-full rounded-xl bg-gradient-to-r from-[#1C4E80] to-[#2563eb] py-4 font-semibold text-white shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ background: { duration: 2 } }}
      >
        바로 시작하기
      </motion.button>

      <motion.button
        onClick={() => router.push('/register')}
        className="w-full rounded-xl border-2 border-[#1C4E80] py-4 font-semibold text-[#1C4E80]"
        whileHover={{
          scale: 1.02,
          backgroundColor: '#1C4E80',
          color: '#ffffff',
        }}
        whileTap={{ scale: 0.98 }}
      >
        회원가입
      </motion.button>
    </motion.div>
  );
}
