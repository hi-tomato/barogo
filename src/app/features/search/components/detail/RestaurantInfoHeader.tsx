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
    <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-4 lg:py-5">
      <div className="mb-3 flex items-start justify-between sm:mb-4 md:mb-4 lg:mb-3">
        <div className="flex-1">
          <motion.h1
            className="mb-2 text-xl font-bold text-[#2B2B2B] sm:mb-3 sm:text-2xl md:text-3xl lg:text-2xl"
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
            <span className="text-xs text-gray-600 sm:text-sm md:text-base lg:text-sm">
              {avgRating()}
            </span>
            <span className="text-xs text-gray-600 sm:text-sm md:text-base lg:text-xs">
              ({restaurant.reviews?.length || 0})
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mt-2 min-w-0 flex-1">
              <div className="flex items-center gap-1 truncate text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base lg:text-sm">
                <FaLocationDot
                  size={14}
                  className="sm:text-base md:text-lg lg:text-sm"
                />{' '}
                {restaurant.address}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
