import { useGetBaropotList } from '@/app/shared/hooks/queries/useBaropot';
import { BaropotsQueries } from '@/app/shared/types/baropots';
import { statusOptions } from '@/app/shared/lib/baropotOptions';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { LoadingSpinner } from '@/app/shared/ui';
import BaropotItem from './BaropotItems';

interface BaropotListProps {
  queries: BaropotsQueries;
  onQueriesChange: (queries: BaropotsQueries) => void;
  isLoading: boolean;
  error: Error | null;
  onRefresh?: () => void;
  onJoin?: (id: number) => void;
  isJoining?: boolean;
}

export default function BaropotList({
  queries,
  onQueriesChange,
  isLoading,
  error,
  onRefresh,
  onJoin,
}: BaropotListProps) {
  const { user } = useAuthStore();
  const { data: baropots, error: baropotError } = useGetBaropotList(queries);

  const handleFilterChange = (key: keyof BaropotsQueries, value: any) => {
    onQueriesChange({
      ...queries,
      [key]: value === '' ? undefined : value,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );

    if (!statusOption) {
      return (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
          {status}
        </span>
      );
    }

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${statusOption.bgColor} ${statusOption.textColor}`}
      >
        {statusOption.label}
      </span>
    );
  };

  if (isLoading) {
    return <LoadingSpinner message="바로팟을 불러오는 중..." size="lg" />;
  }

  if (baropotError) return <Error onRefresh={onRefresh} />;
  if (!baropots || baropots.length === 0) return <NotFound />;

  return (
    <div className="space-y-4">
      {baropots.map((baropot) => (
        <BaropotItem key={baropot.id} baropot={baropot} onJoin={onJoin} />
      ))}
    </div>
  );
}

const Error = ({ onRefresh }: { onRefresh?: () => void }) => {
  return (
    <div className="py-12 text-center">
      <p className="mb-4 text-red-500">데이터를 불러오는데 실패했습니다</p>
      <button
        onClick={onRefresh}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="py-12 text-center text-gray-500">
      현재 진행중인 바로팟이 없습니다
    </div>
  );
};
