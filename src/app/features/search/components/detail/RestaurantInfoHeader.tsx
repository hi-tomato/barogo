"use client";
import { motion } from "framer-motion";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import { Button } from "@/app/shared/ui";

interface RestaurantInfoHeaderProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantInfoHeader({
  restaurant,
}: RestaurantInfoHeaderProps) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <motion.h1
            className="text-2xl font-bold text-[#2B2B2B] mb-3"
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
            <div className="flex-1 min-w-0">
              <div className="text-gray-600 text-sm leading-relaxed truncate">
                {restaurant.address}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#1C4E80] text-sm font-medium mt-1"
              >
                지도보기 →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
