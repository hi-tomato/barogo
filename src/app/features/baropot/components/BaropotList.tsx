import { BaropotListResponse } from '@/app/shared/types/baropots';
import BaropotItem from './BaropotItems';
import PopularStatus from '@/app/features/popular/modal/PopularStatus';

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
        <PopularStatus type="loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-2 text-center">
        {onRefresh && <PopularStatus type="error" />}
      </div>
    );
  }

  if (!baropotList || baropotList.length === 0) {
    return (
      <div className="py-12 text-center">
        <PopularStatus type="notFound" />
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
