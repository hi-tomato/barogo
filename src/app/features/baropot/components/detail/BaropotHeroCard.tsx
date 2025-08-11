import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';
import { HiClock, HiLocationMarker } from 'react-icons/hi';

interface BaropotHeroCardProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotHeroCard({ baropot }: BaropotHeroCardProps) {
  return (
    <div className="">
      <div className="rounded-b-3xl bg-gradient-to-br from-[#1C4E80] to-[#2B5F91] px-6 py-8 text-white">
        <div className="mb-6">
          <motion.h2
            className="mb-2 text-3xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {baropot.title}
          </motion.h2>
          <p className="text-lg text-white/90">
            {baropot.host.name}과 함께하는 즐거운 시간!
          </p>
        </div>

        {/* 참가자 정보 카드 - 헤더 내부 */}

        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
              <span className="text-2xl font-bold text-[#1C4E80]">
                {baropot.participantCount}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">현재 참가자</p>
          </div>

          <div className="text-center">
            <div className="mb-2 text-xl text-white/80">of</div>
          </div>

          <div className="text-center">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/50 bg-white/30">
              <span className="text-2xl font-bold text-white">
                {baropot.maxParticipants}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">총 정원</p>
          </div>
        </div>
      </div>

      {/* 모임 정보 카드들 */}
      <div className="mt-6 grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        <motion.div
          className="flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          whileHover={{ y: -1 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md">
            <HiClock className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">모임 시간</p>
            <p className="text-base font-bold text-gray-900">{baropot.time}</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          whileHover={{ y: -1 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md">
            <HiLocationMarker className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">만날 장소</p>
            <p className="text-base font-bold text-gray-900">
              {baropot.restaurant?.address}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          whileHover={{ y: -1 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-purple-600 shadow-md">
            <span className="text-xl font-bold text-white">
              {baropot.host.name.slice(0, 1)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">모임 호스트</p>
            <p className="text-base font-bold text-gray-900">
              {baropot.host.name}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
