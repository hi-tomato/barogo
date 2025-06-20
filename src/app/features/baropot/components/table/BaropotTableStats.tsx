import { BaropotItem } from "@/app/features/baropot/types/baropot";

interface BaropotTableStatsProps {
  baropotList: BaropotItem[];
}

export default function BaropotTableStats({
  baropotList,
}: BaropotTableStatsProps) {
  const stats = {
    total: baropotList.length,
    recruiting: baropotList.filter((b) => b.status === "recruiting").length,
    full: baropotList.filter((b) => b.status === "full").length,
    closed: baropotList.filter((b) => b.status === "closed").length,
  };

  return (
    <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-3">📊 바로팟 현황</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.total}
          </h3>
          <p className="text-xs text-gray-500">전체</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-1">
            {stats.recruiting}
          </h3>
          <p className="text-xs text-gray-500">모집중</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-orange-600 mb-1">
            {stats.full}
          </h3>
          <p className="text-xs text-gray-500">모집완료</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-600 mb-1">
            {stats.closed}
          </h3>
          <p className="text-xs text-gray-500">종료</p>
        </div>
      </div>
    </div>
  );
}
