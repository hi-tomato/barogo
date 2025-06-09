"use client";
import { useRestaurantDetail } from "@/app/hooks/queries/useRestaurantDetail";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import React from "react";

export default function RestaurantInfo() {
  const params = useParams<{ kakaoId: string }>();
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurantDetail(params.kakaoId);
  console.log(restaurant);

  if (isLoading) return <div>데이터를 불러오고 있습니다...</div>;

  if (isError || !restaurant)
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <p className="text-red-500">맛집 정보를 불러올 수 없습니다.</p>
      </div>
    );

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
            <span className="font-bold text-lg text-gray-900">
              {restaurant.rating}
            </span>
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
        <p className="text-[#2B2B2B] leading-relaxed">
          {restaurant.description}
        </p>
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
              <div className="text-gray-600 text-sm">{restaurant.phone}</div>
              <motion.button
                className="text-[#1C4E80] text-sm font-medium mt-1"
                whileHover={{ scale: 1.05 }}
              >
                전화걸기 →
              </motion.button>
            </div>
          </motion.div>

          {/* 영업시간 */}
          <motion.div
            className="flex items-start space-x-3 p-3 bg-[#F8F9FA] rounded-lg"
            whileHover={{ backgroundColor: "#F0F4F8" }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🕐</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-[#2B2B2B] mb-1">영업시간</div>
              <div className="text-gray-600 text-sm">
                {restaurant.openHours}
              </div>
              <div className="inline-block mt-1">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  영업중
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 태그 섹션 */}
      <div className="px-4 py-6 border-t border-gray-100">
        <h3 className="font-semibold text-[#2B2B2B] text-lg mb-4">태그</h3>
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag, index) => (
            <motion.span
              key={index}
              className="px-3 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-700 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="px-4 py-6 bg-[#F8F9FA] space-y-3">
        <motion.button
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>⚡</span>
          <span>바로팟 만들기</span>
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            className="bg-white border border-gray-200 text-[#2B2B2B] font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02, backgroundColor: "#F8F9FA" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>💙 찜하기</span>
          </motion.button>
          <motion.button
            className="bg-white border border-gray-200 text-[#2B2B2B] font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02, backgroundColor: "#F8F9FA" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📤 공유하기</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
