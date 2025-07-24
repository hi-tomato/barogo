'use client';
import { motion } from 'framer-motion';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import LocationCard from '../cards/LocationCard';

interface LocationTabProps {
  restaurant: RestaurantDetail;
}

export default function LocationTab({ restaurant }: LocationTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <LocationCard restaurant={restaurant} />
    </motion.div>
  );
}
