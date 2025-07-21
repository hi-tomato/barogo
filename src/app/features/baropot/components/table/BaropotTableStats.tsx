import { BaropotListResponse } from '@/app/shared/types/baropots';
import { BaropotStatus } from '@/app/shared/types/enums';

interface BaropotTableStatsProps {
  baropotList: BaropotListResponse[];
}

export default function BaropotTableStats({
  baropotList,
}: BaropotTableStatsProps) {
  const stats = {
    total: baropotList.length,
    recruiting: baropotList.filter((b) => b.status === BaropotStatus.OPEN)
      .length,
    full: baropotList.filter((b) => b.status === BaropotStatus.FULL).length,
    closed: baropotList.filter((b) => b.status === BaropotStatus.COMPLETED)
      .length,
  };

  return (
    <div className="mx-4 mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold text-gray-900">📊 바로팟 현황</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <h3 className="mb-1 text-2xl font-bold text-gray-900">
            {stats.total}
          </h3>
          <p className="text-xs text-gray-500">전체</p>
        </div>
        <div className="text-center">
          <h3 className="mb-1 text-2xl font-bold text-blue-600">
            {stats.recruiting}
          </h3>
          <p className="text-xs text-gray-500">모집중</p>
        </div>
        <div className="text-center">
          <h3 className="mb-1 text-2xl font-bold text-orange-600">
            {stats.full}
          </h3>
          <p className="text-xs text-gray-500">모집완료</p>
        </div>
        <div className="text-center">
          <h3 className="mb-1 text-2xl font-bold text-gray-600">
            {stats.closed}
          </h3>
          <p className="text-xs text-gray-500">종료</p>
        </div>
      </div>
    </div>
  );
}
