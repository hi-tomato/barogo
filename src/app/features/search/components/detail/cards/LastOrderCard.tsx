'use client';
import { motion } from 'framer-motion';
import { HiClock } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { formatTime } from '@/app/shared/lib/restaurantUtils';

interface LastOrderCardProps {
  restaurant: RestaurantDetail;
}

export default function LastOrderCard({ restaurant }: LastOrderCardProps) {
  if (!restaurant.lastOrderTime) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="group relative h-full min-h-[100px] overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex h-full flex-col justify-center p-3 sm:p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
            <HiClock className="text-white sm:text-lg" size={16} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              라스트 오더
            </p>
            <p className="text-sm font-semibold text-gray-800 sm:text-base">
              {formatTime(restaurant.lastOrderTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-16 w-16 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-orange-200/20 to-transparent" />
    </motion.div>
  );
}
