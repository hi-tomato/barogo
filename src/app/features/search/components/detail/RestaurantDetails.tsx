"use client";
import { motion } from "framer-motion";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import { HiPhone, HiClock, HiTag } from "react-icons/hi";

interface RestaurantDetailsProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  const formatTime = (time: string) => {
    if (!time) return "정보 없음";
    return time;
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "정보 없음";
    // 전화번호 형식화 (예: 010-1234-5678)
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phone;
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 카테고리 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] rounded-xl flex items-center justify-center">
          <HiTag className="text-white" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">카테고리</p>
          <p className="font-semibold text-[#2B2B2B]">
            {restaurant.category || "정보 없음"}
          </p>
        </div>
      </motion.div>

      {/* 전화번호 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-xl flex items-center justify-center">
          <HiPhone className="text-white" size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">전화번호</p>
          <p className="font-semibold text-[#2B2B2B]">
            {formatPhoneNumber(restaurant.phoneNumber)}
          </p>
        </div>
      </motion.div>

      {/* 영업시간 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center space-x-3 p-4 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-xl flex items-center justify-center">
          <HiClock className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">영업시간</p>
          <div className="space-y-1">
            <p className="font-semibold text-[#2B2B2B]">
              {formatTime(restaurant.openingTime)} -{" "}
              {formatTime(restaurant.closingTime)}
            </p>
            {restaurant.lastOrderTime && (
              <p className="text-sm text-gray-500">
                마지막 주문: {formatTime(restaurant.lastOrderTime)}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 태그 */}
      {restaurant.restaurantToRestaurantTags &&
        restaurant.restaurantToRestaurantTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl"
          >
            <p className="text-sm text-gray-600 font-medium mb-3">관련 태그</p>
            <div className="flex flex-wrap gap-2">
              {restaurant.restaurantToRestaurantTags.map(
                (tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white text-sm rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        )}
    </div>
  );
}
