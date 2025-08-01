import { motion } from 'framer-motion';
import { itemVariants } from '@/app/shared/lib/animation';
import { FeatureCardProps } from '../types';

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      className="rounded-xl bg-white/90 p-6 shadow-xl backdrop-blur-sm"
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="mb-4 text-4xl">{icon}</motion.div>
      <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">{title}</h3>
      <p className="text-sm text-[#8A8A8A]">{description}</p>
    </motion.div>
  );
}
