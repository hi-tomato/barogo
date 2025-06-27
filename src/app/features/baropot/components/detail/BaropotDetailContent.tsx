// BaropotDetailContent.tsx
import { containerVariants, itemVariants } from "@/app/shared/lib/animation";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import React from "react";
import { HiClock, HiLocationMarker, HiUsers, HiCalendar } from "react-icons/hi";

export default function BaropotDetailContent({
  baropot,
}: {
  baropot: BaropotDetailResponse;
}) {
  return (
    <motion.div
      className="pb-28 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 메인 히어로 카드 */}
      <motion.div
        className="mt-6 bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-8 shadow-lg border border-white/80 backdrop-blur-sm relative overflow-hidden"
        variants={itemVariants}
      >
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1C4E80]/5 to-[#C6A46A]/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#C6A46A]/5 to-[#1C4E80]/5 rounded-full translate-y-12 -translate-x-12" />

        {/* 상단 정보 */}
        <div className="relative z-10 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <motion.h2
                className="text-3xl font-bold text-[#2B2B2B] mb-3 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {baropot.title}
              </motion.h2>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-[#C6A46A] to-[#D4AF37] rounded-full animate-pulse" />
                <p className="text-[#8A8A8A] font-semibold text-lg">
                  {baropot.restaurant?.name}
                </p>
              </div>
            </div>

            <motion.span
              className={`relative px-6 py-3 rounded-2xl text-sm font-bold shadow-md ${
                baropot.status === "OPEN"
                  ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white"
                  : "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {baropot.status === "OPEN" ? "🟢 모집중" : "⭕ 마감"}
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity" />
            </motion.span>
          </div>

          {/* 참가자 현황 - 더욱 화려하게 */}
          <motion.div
            className="bg-gradient-to-r from-[#E6EEF5] via-[#EEF2FF] to-[#E6EEF5] rounded-3xl p-8 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E80]/5 to-[#C6A46A]/5" />
            <div className="relative flex items-center justify-center space-x-12">
              <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] rounded-full mb-3 shadow-xl">
                    <span className="text-3xl font-bold text-white">
                      {baropot.participantCount}
                    </span>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#1C4E80]/20 to-[#2563eb]/20 rounded-full animate-ping" />
                </div>
                <p className="text-sm text-[#8A8A8A] font-bold">현재 참가자</p>
              </motion.div>

              <div className="text-center">
                <div className="text-4xl text-[#C6A46A] mb-3 animate-pulse">
                  ⚡
                </div>
                <p className="text-sm text-[#8A8A8A] font-bold">of</p>
              </div>

              <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-[#1C4E80] rounded-full mb-3 shadow-xl">
                  <span className="text-3xl font-bold text-[#1C4E80]">
                    {baropot.maxParticipants}
                  </span>
                </div>
                <p className="text-sm text-[#8A8A8A] font-bold">총 정원</p>
              </motion.div>
            </div>
          </motion.div>

          {/* 기본 정보 - 더 세련되게 */}
          <div className="space-y-6">
            <motion.div
              className="flex items-center space-x-4 p-6 bg-white/60 rounded-2xl border border-[#E6EEF5] backdrop-blur-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] rounded-2xl flex items-center justify-center shadow-lg">
                <HiClock className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#8A8A8A] font-medium">모임 시간</p>
                <p className="font-bold text-[#2B2B2B] text-lg">
                  {baropot.time}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 p-6 bg-white/60 rounded-2xl border border-[#E6EEF5] backdrop-blur-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-[#C6A46A] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg">
                <HiLocationMarker className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-[#8A8A8A] font-medium">만날 장소</p>
                <p className="font-bold text-[#2B2B2B] text-lg">
                  {baropot.restaurant?.address}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 설명 카드 */}
      <motion.div
        className="mt-6 bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-8 shadow-lg border border-white/80"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-bold text-[#2B2B2B] text-2xl">모임 소개</h3>
        </div>
        <p className="text-[#2B2B2B] leading-relaxed text-lg bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] p-6 rounded-2xl">
          {baropot.description}
        </p>
      </motion.div>

      {/* 참가 조건 카드 */}
      <motion.div
        className="mt-6 bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-8 shadow-lg border border-white/80"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-[#EC4899] to-[#F97316] rounded-2xl flex items-center justify-center shadow-lg">
            <HiUsers className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-[#2B2B2B] text-2xl">참가 조건</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "연령대", value: baropot.participantAgeGroup, icon: "👥" },
            {
              label: "참가 성별",
              value: baropot.participantGender,
              icon: "⚖️",
            },
            { label: "결제 방식", value: baropot.paymentMethod, icon: "💳" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-[#E6EEF5] to-[#EEF2FF] rounded-2xl border border-white/50 hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[#8A8A8A] font-semibold">
                  {item.label}
                </span>
              </div>
              <span className="font-bold text-[#2B2B2B] text-lg">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 태그 카드 */}
      {baropot.tags && baropot.tags.length > 0 && (
        <motion.div
          className="mt-6 bg-gradient-to-br from-white to-[#F8FAFC] rounded-3xl p-8 shadow-lg border border-white/80"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🏷️</span>
            </div>
            <h3 className="font-bold text-[#2B2B2B] text-2xl">관련 태그</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {baropot.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-[#1C4E80] via-[#2563eb] to-[#6366F1] text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
