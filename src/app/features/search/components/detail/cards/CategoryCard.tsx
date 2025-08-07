'use client';
import { motion } from 'framer-motion';
import { HiTag } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';

interface CategoryCardProps {
  restaurant: RestaurantDetail;
}

export default function CategoryCard({ restaurant }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="group relative h-full min-h-[100px] overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex h-full flex-col justify-center p-3 sm:p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
            <HiTag className="text-white sm:text-lg" size={16} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-600 sm:text-sm">
              카테고리
            </p>
            <p className="text-sm font-semibold text-gray-800 sm:text-base">
              {restaurant.category || '정보 없음'}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-blue-200/20 to-transparent" />
    </motion.div>
  );
}
