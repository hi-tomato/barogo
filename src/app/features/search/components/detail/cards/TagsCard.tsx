'use client';
import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';

interface TagsCardProps {
  restaurant: RestaurantDetail;
}

export default function TagsCard({ restaurant }: TagsCardProps) {
  if (
    !restaurant.restaurantToRestaurantTags ||
    restaurant.restaurantToRestaurantTags.length === 0
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="p-4">
        <div className="mb-3 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-110">
            <HiHeart className="text-white" size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">관련 태그</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.restaurantToRestaurantTags.map(
            (tag: string, index: number) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105"
              >
                #{tag}
              </motion.span>
            )
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br from-purple-200/20 to-transparent" />
    </motion.div>
  );
}
