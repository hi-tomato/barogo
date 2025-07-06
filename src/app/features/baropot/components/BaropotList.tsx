import { BaropotListResponse } from '@/app/shared/types/baropots';
import { LoadingSpinner } from '@/app/shared/ui';
import BaropotItem from './BaropotItems';

interface BaropotListProps {
  baropotList: BaropotListResponse[];
  isLoading: boolean;
  error: Error | null;
  onRefresh?: () => void;
  onJoin?: (id: number) => void;
  isJoining?: boolean;
}

export default function BaropotList({
  baropotList,
  isLoading,
  error,
  onRefresh,
  onJoin,
  isJoining = false,
}: BaropotListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner message="바로팟을 불러오는 중..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-500">데이터를 불러오는데 실패했습니다</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            다시 시도
          </button>
        )}
      </div>
    );
  }

  if (!baropotList || baropotList.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="mb-4 text-6xl">🍽️</div>
        <h3 className="mb-2 text-lg font-semibold">
          현재 진행중인 바로팟이 없습니다
        </h3>
        <p className="text-sm">새로운 바로팟을 만들어보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {baropotList.map((baropot) => (
        <BaropotItem
          key={baropot.id}
          baropot={baropot}
          onJoin={onJoin}
          isJoining={isJoining}
        />
      ))}
    </div>
  );
}
