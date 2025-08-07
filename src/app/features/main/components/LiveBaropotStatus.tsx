'use client';
import { useGetBaropotList } from '@/app/shared/hooks/queries/useBaropot';
import { BaropotStatus } from '@/app/shared/types/enums';
import Link from 'next/link';

export default function LiveBaropotStatus() {
  const { data: baropotList = [], isLoading } = useGetBaropotList();

  const recruitingCount = baropotList.filter(
    (baropot) => baropot.status === BaropotStatus.OPEN
  ).length;

  return (
    <Link href="/baropot" className="mb-4 block sm:mb-5 md:mb-6 lg:mb-4">
      <div className="rounded-xl bg-gradient-to-r from-orange-400 to-red-500 p-4 text-white shadow-lg transition-all duration-200 hover:shadow-xl sm:p-5 md:p-6 lg:p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="mb-2 rounded-full bg-white/20 px-2 py-1 text-xs font-medium">
                🔥 번개 모임
              </span>
            </div>
            <h3 className="mb-2 flex items-center text-base font-semibold sm:text-lg md:text-xl lg:text-lg">
              실시간 바로팟
            </h3>
            <p className="mb-3 text-xs opacity-90 sm:text-sm md:text-base lg:text-sm">
              지금 모집중인 바로팟에 참여해보세요!
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-3xl">
                {isLoading ? '...' : recruitingCount}
              </span>
              <span className="text-xs opacity-90">개 진행중</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
