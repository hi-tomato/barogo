import { containerVariants, itemVariants } from "@/app/shared/lib/animation";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import React from "react";
import { HiClock, HiLocationMarker, HiUsers } from "react-icons/hi";

export default function BaropotDetailContent({
  baropot,
}: {
  baropot: BaropotDetailResponse;
}) {
  return (
    <motion.div
      className="pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 메인 카드 */}
      <motion.div
        className="mx-4 mt-6 bg-white rounded-2xl p-6 shadow-sm border border-white"
        variants={itemVariants}
      >
        {/* 상단 정보 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#2B2B2B] mb-2 leading-tight">
              {baropot.title}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#C6A46A] rounded-full"></div>
              <p className="text-[#8A8A8A] font-medium">
                {baropot.restaurant?.name}
              </p>
            </div>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              baropot.status === "OPEN"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {baropot.status === "OPEN" ? "🟢 모집중" : "⭕ 마감"}
          </span>
        </div>

        {/* 참가자 현황 */}
        <div className="bg-[#E6EEF5] rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 bg-[#1C4E80] rounded-full mb-2">
                <span className="text-2xl font-bold text-white">
                  {baropot.participantCount}
                </span>
              </div>
              <p className="text-xs text-[#8A8A8A] font-medium">현재 참가자</p>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#C6A46A] mb-2">•••</div>
              <p className="text-xs text-[#8A8A8A] font-medium">of</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 bg-white border-2 border-[#1C4E80] rounded-full mb-2">
                <span className="text-2xl font-bold text-[#1C4E80]">
                  {baropot.maxParticipants}
                </span>
              </div>
              <p className="text-xs text-[#8A8A8A] font-medium">총 정원</p>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#E6EEF5] rounded-xl flex items-center justify-center">
              <HiClock className="text-[#1C4E80]" size={20} />
            </div>
            <div>
              <p className="text-sm text-[#8A8A8A]">모임 시간</p>
              <p className="font-semibold text-[#2B2B2B]">{baropot.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#E6EEF5] rounded-xl flex items-center justify-center">
              <HiLocationMarker className="text-[#1C4E80]" size={20} />
            </div>
            <div>
              <p className="text-sm text-[#8A8A8A]">만날 장소</p>
              <p className="font-semibold text-[#2B2B2B]">
                {baropot.restaurant?.address}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 설명 카드 */}
      <motion.div
        className="mx-4 mt-4 bg-white rounded-2xl p-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#E6EEF5] rounded-xl flex items-center justify-center">
            <span className="text-xl">📝</span>
          </div>
          <h3 className="font-bold text-[#2B2B2B] text-lg">모임 소개</h3>
        </div>
        <p className="text-[#2B2B2B] leading-relaxed">{baropot.description}</p>
      </motion.div>

      {/* 참가 조건 카드 */}
      <motion.div
        className="mx-4 mt-4 bg-white rounded-2xl p-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 bg-[#E6EEF5] rounded-xl flex items-center justify-center">
            <HiUsers className="text-[#1C4E80]" size={20} />
          </div>
          <h3 className="font-bold text-[#2B2B2B] text-lg">참가 조건</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 bg-[#E6EEF5] rounded-xl">
            <span className="text-[#8A8A8A] font-medium">연령대</span>
            <span className="font-semibold text-[#2B2B2B]">
              {baropot.participantAgeGroup}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#E6EEF5] rounded-xl">
            <span className="text-[#8A8A8A] font-medium">참가 성별</span>
            <span className="font-semibold text-[#2B2B2B]">
              {baropot.participantGender}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#E6EEF5] rounded-xl">
            <span className="text-[#8A8A8A] font-medium">결제 방식</span>
            <span className="font-semibold text-[#2B2B2B]">
              {baropot.paymentMethod}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 태그 카드 */}
      {baropot.tags && baropot.tags.length > 0 && (
        <motion.div
          className="mx-4 mt-4 bg-white rounded-2xl p-6 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#E6EEF5] rounded-xl flex items-center justify-center">
              <span className="text-xl">🏷️</span>
            </div>
            <h3 className="font-bold text-[#2B2B2B] text-lg">관련 태그</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {baropot.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white rounded-xl text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
