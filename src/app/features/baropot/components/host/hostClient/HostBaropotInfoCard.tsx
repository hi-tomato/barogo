import { motion } from 'framer-motion';
import { getStatusBadge } from '@/app/shared/lib/baropotUtils';
import { itemVariants } from '@/app/shared/lib/animation';
import { BaropotListResponse } from '@/app/shared/types/baropots';
import HostBaropotActionButton from './HostBaropotActionButton';

export default function HostBaropotInfoCard({
  baropot,
  onManageClick,
}: {
  baropot: BaropotListResponse;
  onManageClick: (baropotId: number) => void;
}) {
  return (
    <>
      <motion.div
        key={baropot.id}
        variants={itemVariants}
        className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        {/* 상태와 날짜 */}
        <div className="mb-4 flex items-start justify-between">
          {getStatusBadge(baropot.status)}
          <span className="text-sm text-[#8A8A8A]">
            {baropot.date} {baropot.time}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-[#2B2B2B]">
          {baropot.title}
        </h3>

        {/* 맛집 정보 */}
        <div className="mb-3">
          <p className="font-medium text-[#2B2B2B]">
            {baropot.restaurant.name}
          </p>
          <p className="text-sm text-[#8A8A8A]">{baropot.restaurant.address}</p>
        </div>

        {/* 참가자 정보 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#8A8A8A]">참가자</span>
            <span className="font-medium text-[#1C4E80]">
              {baropot.participantCount}/{baropot.maxParticipants}명
            </span>
          </div>
          <div className="text-sm text-[#8A8A8A]">
            📍 {baropot.restaurant.address}
          </div>
        </div>

        {/* 태그 */}
        {baropot.tags && baropot.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {baropot.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-[#E6EEF5] px-2 py-1 text-xs text-[#1C4E80]"
              >
                #{tag}
              </span>
            ))}
            {baropot.tags.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{baropot.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 액션 버튼 */}
        <HostBaropotActionButton
          baropot={baropot}
          onManageClick={onManageClick}
        />
      </motion.div>
    </>
  );
}
