'use client';
import { motion } from 'framer-motion';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import BusinessStatusCard from '../cards/BusinessStatusCard';
import CategoryCard from '../cards/CategoryCard';
import LastOrderCard from '../cards/LastOrderCard';
import TagsCard from '../cards/TagsCard';

interface BasicInfoTabProps {
  restaurant: RestaurantDetail;
}

export default function BasicInfoTab({ restaurant }: BasicInfoTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BusinessStatusCard restaurant={restaurant} />
        <CategoryCard restaurant={restaurant} />
        <LastOrderCard restaurant={restaurant} />
      </div>

      <TagsCard restaurant={restaurant} />
    </motion.div>
  );
}
