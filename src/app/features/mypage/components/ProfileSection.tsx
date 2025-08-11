'use client';
import { useAuthStore } from '@/app/shared/store/useAuthStore';

interface UserStats {
  reviews: number;
  baropots: number;
  bookmarks: number;
}

interface ProfileSectionProps {
  userStats: UserStats;
}

export default function ProfileSection({ userStats }: ProfileSectionProps) {
  const { user } = useAuthStore();

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* 프로필 이미지 - 실제 사용자 이름 사용 */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1C4E80]">
          <span className="text-2xl font-bold text-white">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>

        {/* 사용자 정보 - 실제 데이터 사용 */}
        <div className="flex-1">
          <h2 className="mb-1 text-xl font-semibold text-[#2B2B2B]">
            {user?.name || '사용자'}
          </h2>
          <p className="text-sm text-[#8A8A8A]">
            {user?.email || '맛집 탐험가'}
          </p>
        </div>
      </div>

      {/* 통계 */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="mb-1 text-2xl font-bold text-[#1C4E80]">
            {userStats.reviews}
          </div>
          <div className="text-sm text-[#8A8A8A]">리뷰</div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-2xl font-bold text-[#1C4E80]">
            {userStats.baropots}
          </div>
          <div className="text-sm text-[#8A8A8A]">바로팟</div>
        </div>
        <div className="text-center">
          <div className="mb-1 text-2xl font-bold text-[#1C4E80]">
            {userStats.bookmarks}
          </div>
          <div className="text-sm text-[#8A8A8A]">찜한곳</div>
        </div>
      </div>
    </div>
  );
}
