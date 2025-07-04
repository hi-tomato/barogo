import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import { HiClock, HiLocationMarker } from "react-icons/hi";
import { Card } from "@/app/shared/ui";

interface BaropotHeroCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotHeroCard({ baropot }: BaropotHeroCardProps) {
  return (
    <Card
      variant="gradient"
      size="lg"
      padding="lg"
      className="mt-6 relative overflow-hidden"
      animate={true}
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
        </div>

        {/* 참가자 정보 섹션 */}
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
              <p className="font-bold text-[#2B2B2B] text-lg">{baropot.time}</p>
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
    </Card>
  );
}
