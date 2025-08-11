'use client';
import { motion } from 'framer-motion';
import { containerVariants } from '@/app/shared/lib/animation';
import LandingHeader from './LandingHeader';
import FeatureSection from './FeatureSection';
import LandingActions from './LandingActions';

export default function LandingContainer() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LandingHeader />
        <FeatureSection />
        <LandingActions />
      </motion.div>
    </div>
  );
}
