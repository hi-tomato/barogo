// BaropotDetailContent.tsx
import { containerVariants } from '@/app/shared/lib/animation';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';
import React from 'react';
import BaropotHeroCard from './BaropotHeroCard';
import BaropotDescriptionCard from './BaropotDescriptionCard';
import BaropotConditionsCard from './BaropotConditionsCard';
import BaropotTagsCard from './BaropotTagsCard';

export default function BaropotDetailContent({
  baropot,
}: {
  baropot: BaropotDetailResponse;
}) {
  return (
    <motion.div
      className="pb-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <BaropotHeroCard baropot={baropot} />
      <BaropotDescriptionCard baropot={baropot} />
      <BaropotConditionsCard baropot={baropot} />
      <BaropotTagsCard baropot={baropot} />
    </motion.div>
  );
}
