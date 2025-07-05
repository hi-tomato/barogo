'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/app/shared/ui';
import { RestaurantDetail } from '@/app/shared/types/restaurant';

interface RestaurantHeaderProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

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
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm leading-relaxed text-gray-600">
                {restaurant.address}
              </div>
              <Button
                text="지도보기 →"
                variant="outline"
                size="sm"
                className="mt-1"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
