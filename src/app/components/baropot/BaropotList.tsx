// components/baropot/BaropotList.tsx
import BaropotItem from "./BaropotItems";
import type { BaropotItem as BaropotItemType } from "@/app/types";

interface BaropotListProps {
  baropotList: BaropotItemType[];
  isLoading: boolean;
  error: Error | null;
  onRefresh?: () => void;
  onJoin?: (id: number) => void;
}

export default function BaropotList({
  baropotList,
  isLoading,
  error,
  onRefresh,
  onJoin,
}: BaropotListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500">로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">데이터를 불러오는데 실패했습니다</p>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (baropotList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        현재 진행중인 바로팟이 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {baropotList.map((baropot) => (
        <BaropotItem key={baropot.id} baropot={baropot} onJoin={onJoin} />
      ))}
    </div>
  );
}
