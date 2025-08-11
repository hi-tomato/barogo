import { motion } from 'framer-motion';
import { itemVariants } from '@/app/shared/lib/animation';

export default function LandingHeader() {
  return (
    <motion.div className="mb-8 text-center" variants={itemVariants}>
      <motion.div
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1C4E80] to-[#2563eb] shadow-2xl"
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.8 },
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(28, 78, 128, 0.3)',
            '0 0 40px rgba(28, 78, 128, 0.6)',
            '0 0 20px rgba(28, 78, 128, 0.3)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <span className="text-4xl font-bold text-white">B</span>
      </motion.div>

      <motion.h1
        className="mb-4 text-5xl font-bold text-[#1C4E80]"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Barogo
      </motion.h1>

      <motion.p
        className="text-lg leading-relaxed text-[#8A8A8A]"
        variants={itemVariants}
      >
        혼밥하기 싫다면, 파티원을 구해서
        <motion.span
          className="font-semibold text-[#1C4E80]"
          animate={{ color: ['#1C4E80', '#2563eb', '#1C4E80'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          바로고!
        </motion.span>
      </motion.p>
    </motion.div>
  );
}
