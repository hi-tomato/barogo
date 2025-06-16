"use client";
import { motion } from "framer-motion";
import { RestaurantDetail } from "@/app/shared/types/restaurant";

interface RestaurantInfoProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* 메인 정보 섹션 */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#2B2B2B] mb-2">
            {restaurant.name}
          </h1>
          <span className="inline-block px-3 py-1 bg-[#E6EEF5] text-[#1C4E80] rounded-full text-sm font-medium">
            {restaurant.category}
          </span>
        </div>

        {/* 평점 & 리뷰 */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 rounded-lg">
            <span className="text-yellow-500 text-lg mr-1">⭐</span>
            <span className="text-gray-500 ml-2">
              리뷰 {restaurant.reviewCount}개
            </span>
          </div>
          <motion.button
            className="ml-auto px-4 py-2 bg-[#1C4E80] text-white rounded-lg font-medium flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📝</span>
            <span>리뷰쓰기</span>
          </motion.button>
        </div>

        {/* 설명 */}
        <p className="text-[#2B2B2B] leading-relaxed mb-6">
          {restaurant.description}
        </p>

        {/* 태그 */}
        {restaurant.restaurantToRestaurantTags &&
          restaurant.restaurantToRestaurantTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {restaurant.restaurantToRestaurantTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="px-4 py-6 space-y-4">
        <h3 className="font-semibold text-[#2B2B2B] text-lg mb-4">상세 정보</h3>

        <div className="space-y-4">
          {/* 주소 */}
          <motion.div
            className="flex items-start space-x-3 p-3 bg-[#F8F9FA] rounded-lg"
            whileHover={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">📍</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#2B2B2B] mb-1">주소</div>
              <div className="text-gray-600 text-sm">{restaurant.address}</div>
              <motion.button
                className="text-[#1C4E80] text-sm font-medium mt-1"
                whileHover={{ scale: 1.05 }}
              >
                지도보기 →
              </motion.button>
            </div>
          </motion.div>

          {/* 전화번호 */}
          <motion.div
            className="flex items-start space-x-3 p-3 bg-[#F8F9FA] rounded-lg"
            whileHover={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">📞</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#2B2B2B] mb-1">전화번호</div>
              <div className="text-gray-600 text-sm">
                {restaurant.phoneNumber}
              </div>
            </div>
          </motion.div>

          {/* 운영시간 */}
          <motion.div
            className="flex items-start space-x-3 p-3 bg-[#F8F9FA] rounded-lg"
            whileHover={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🕐</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#2B2B2B] mb-1">운영시간</div>
              <div className="text-gray-600 text-sm">
                {restaurant.openingTime} - {restaurant.closingTime}
              </div>
              <div className="text-gray-500 text-xs mt-1">
                라스트 오더: {restaurant.lastOrderTime}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
