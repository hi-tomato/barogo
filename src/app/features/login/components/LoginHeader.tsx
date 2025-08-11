import { motion } from 'framer-motion';
import { itemVariants } from '@/app/shared/lib/animation';

export default function LoginHeader() {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      <h1 className="font-suit mb-2 text-center text-2xl leading-relaxed font-semibold text-[#1C4E80]">
        Barogo
      </h1>
      <p className="font-suit mb-6 text-center text-sm leading-relaxed text-[#8A8A8A]">
        혼밥하기 싫다면, 파티원을 구해서 바로고!
      </p>
    </motion.div>
  );
}
