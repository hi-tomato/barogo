'use client';
import { motion } from 'framer-motion';
import { HiClock } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { formatTime, isCurrentlyOpen } from '@/app/shared/lib/restaurantUtils';

interface BusinessStatusCardProps {
  restaurant: RestaurantDetail;
}

export default function BusinessStatusCard({
  restaurant,
}: BusinessStatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative h-full min-h-[100px] overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50"
    >
      <div className="flex h-full flex-col justify-center p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 sm:h-10 sm:w-10">
              <HiClock className="text-white sm:text-lg" size={16} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 sm:text-sm">
                영업 상태
              </p>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${isCurrentlyOpen(restaurant) ? 'bg-emerald-500' : 'bg-red-500'}`}
                />
                <p className="text-sm font-semibold text-gray-800 sm:text-base">
                  {isCurrentlyOpen(restaurant) ? '영업중' : '마감'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 sm:text-sm">영업시간</p>
            <p className="text-sm font-semibold text-gray-800 sm:text-base">
              {formatTime(restaurant.openingTime)} -{' '}
              {formatTime(restaurant.closingTime)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-emerald-200/20 to-transparent" />
    </motion.div>
  );
}
