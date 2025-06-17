"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiHeart,
  HiOutlineHeart,
  HiShare,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiStar,
  HiDotsVertical,
  HiPencil,
} from "react-icons/hi";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import Button from "@/app/shared/ui/Button";

interface RestaurantInfoProps {
  restaurant: RestaurantDetail;
  isBookmarked?: boolean;
  isOwner?: boolean;
  onBookmarkToggle?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
}

export default function RestaurantInfo({
  restaurant,
  isBookmarked = false,
  isOwner = false,
  onBookmarkToggle,
  onShare,
  onEdit,
}: RestaurantInfoProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showOwnerMenu, setShowOwnerMenu] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${restaurant.phoneNumber}`;
  };

  const handleMapView = () => {
    // TODO: /map 페이지로 이동하여, 해당 맛집을 보여주는 마커 또는 모달창이 필요함
    // const query = encodeURIComponent(restaurant.address);
    // window.open(`https://map.kakao.com/link/search/${query}`);
  };

  const isLongDescription = restaurant.description.length > 100;

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* 메인 정보 헤더 */}
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
                  text=" 지도보기 →"
                  className="text-[#1C4E80] text-sm font-medium mt-1"
                />
              </div>
            </motion.div>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-2 ml-4">
            {/* 북마크 버튼 */}
            <motion.button
              onClick={onBookmarkToggle}
              className={`p-3 rounded-full border-2 transition-all ${
                isBookmarked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isBookmarked ? (
                <HiHeart size={20} />
              ) : (
                <HiOutlineHeart size={20} />
              )}
            </motion.button>

            {/* 공유 버튼 */}
            <motion.button
              onClick={onShare}
              className="p-3 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-500 hover:bg-blue-100 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiShare size={20} />
            </motion.button>

            {/* 소유자 메뉴 */}
            {isOwner && (
              <div className="relative">
                <motion.button
                  onClick={() => setShowOwnerMenu(!showOwnerMenu)}
                  className="p-3 rounded-full bg-orange-50 border-2 border-orange-200 text-orange-500 hover:bg-orange-100 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiDotsVertical size={20} />
                </motion.button>

                {showOwnerMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute right-0 top-14 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[140px] z-50"
                  >
                    <button
                      onClick={() => {
                        onEdit?.();
                        setShowOwnerMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <HiPencil size={16} />
                      <span>정보 수정</span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 설명 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[#2B2B2B] leading-relaxed">
            {showFullDescription || !isLongDescription
              ? restaurant.description
              : `${restaurant.description.slice(0, 100)}...`}
          </p>
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[#1C4E80] text-sm font-medium mt-2 hover:underline"
            >
              {showFullDescription ? "접기" : "더보기"}
            </button>
          )}
        </motion.div>

        {/* 태그 */}
        {restaurant.restaurantToRestaurantTags &&
          restaurant.restaurantToRestaurantTags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {restaurant.restaurantToRestaurantTags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full text-sm border border-gray-200 hover:border-[#1C4E80] hover:text-[#1C4E80] transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          )}
      </div>

      {/* 상세 정보 섹션 */}
      <div className="px-4 py-6 bg-gray-50/50">
        <motion.h3
          className="font-bold text-[#2B2B2B] text-lg mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          상세 정보
        </motion.h3>

        <div className="grid grid-cols-1 gap-4">
          {/* 주소 */}

          {/* 하단 3개 가로 배치 */}
          <div className="grid grid-cols-3 gap-3">
            {/* 전화번호 */}
            <motion.div
              className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={handleCall}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <HiPhone className="text-white text-lg" />
              </div>
              <div className="font-semibold text-[#2B2B2B] text-sm mb-1">
                전화
              </div>
              <div className="text-gray-600 text-xs truncate w-full">
                {restaurant.phoneNumber}
              </div>
            </motion.div>

            {/* 운영시간 */}
            <motion.div
              className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <HiClock className="text-white text-lg" />
              </div>
              <div className="font-semibold text-[#2B2B2B] text-sm mb-1">
                운영시간
              </div>
              <div className="text-gray-600 text-xs">
                {restaurant.openingTime} - {restaurant.closingTime}
              </div>
              <div className="mt-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  영업중
                </span>
              </div>
            </motion.div>

            {/* 라스트 오더 */}
            <motion.div
              className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <span className="text-white text-lg">🕐</span>
              </div>
              <div className="font-semibold text-[#2B2B2B] text-sm mb-1">
                라스트오더
              </div>
              <div className="text-gray-600 text-xs">
                {restaurant.lastOrderTime}
              </div>
              <div className="text-orange-600 text-xs font-medium mt-1">
                주의필요
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 클릭 오버레이 */}
      {showOwnerMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOwnerMenu(false)}
        />
      )}
    </motion.div>
  );
}
