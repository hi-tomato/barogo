'use client';
import { motion } from 'framer-motion';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import StarRating from '@/app/shared/components/StarRating';
import { FaLocationDot } from 'react-icons/fa6';

interface RestaurantInfoHeaderProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantInfoHeader({
  restaurant,
}: RestaurantInfoHeaderProps) {
  const avgRating = () => {
    const reviews = restaurant.reviews;

    if (reviews && reviews.length > 0) {
      const result =
        reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

      return result.toFixed(1);
    }
    return '0';
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <motion.h1
            className="mb-3 text-2xl font-bold text-[#2B2B2B]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {restaurant.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1"
          >
            <StarRating rating={Number(avgRating())} />
            <span className="text-sm text-gray-600">{avgRating()}</span>
            <span className="text-sm text-gray-600">
              ({restaurant.reviews.length})
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mt-2 min-w-0 flex-1">
              <div className="flex items-center gap-1 truncate text-sm leading-relaxed text-gray-600">
                <FaLocationDot size={16} /> {restaurant.address}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
