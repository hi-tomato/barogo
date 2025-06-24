import { BaropotListResponse } from "@/app/shared/types/baropots";
import BaropotItem from "./BaropotItems";

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
}: BaropotListProps) {
  // loading,error,notFound
  if (isLoading) return <Loading />;
  if (error) return <Error onRefresh={onRefresh} />;
  if (baropotList.length === 0) return <NotFound />;

  return (
    <div className="space-y-4">
      {baropotList.map((baropot) => (
        <BaropotItem key={baropot.id} baropot={baropot} onJoin={onJoin} />
      ))}
    </div>
  );
}

const Loading = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-gray-500">로딩중...</p>
    </div>
  );
};

const Error = ({ onRefresh }: { onRefresh?: () => void }) => {
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
};

const NotFound = () => {
  return (
    <div className="text-center py-12 text-gray-500">
      현재 진행중인 바로팟이 없습니다
    </div>
  );
};
