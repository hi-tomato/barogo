import {
  getStatusColor,
  getStatusText,
} from '@/app/features/baropot/hooks/useBaropotStatus';
import { BaropotListResponse } from '@/app/shared/types/baropots';
import { BaropotStatus } from '@/app/shared/types/enums';
import { useRouter } from 'next/navigation';

interface BaropotItemProps {
  baropot: BaropotListResponse;
  onJoin?: (id: number) => void;
  isJoining?: boolean;
}

export default function BaropotItems({
  baropot,
  onJoin,
  isJoining = false,
}: BaropotItemProps) {
  const router = useRouter();

  const handleDetailView = () => {
    router.push(`/baropot/${baropot.id}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md">
      {/* 헤더 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center space-x-2">
            <h3
              className="cursor-pointer font-semibold text-gray-900 hover:text-blue-600"
              onClick={handleDetailView}
            >
              {baropot.title}
            </h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                baropot.status
              )}`}
            >
              {getStatusText(baropot.status)}
            </span>
          </div>
          <p className="text-sm text-gray-600">@{baropot.restaurant.name}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {baropot.participantCount}/{baropot.maxParticipants}명
          </div>
          <div className="mt-1 h-2 w-16 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{
                width: `${
                  (baropot.participantCount / baropot.maxParticipants) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 정보 */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2 h-4 w-4">📍</span>
          {baropot.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2 h-4 w-4">🕐</span>
          {baropot.date} {baropot.time}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2 h-4 w-4">👤</span>
          호스트: {baropot.host.name}
        </div>
      </div>

      {/* 태그 & 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {baropot.tags?.map((tag, index) => (
            <span
              key={index}
              className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleDetailView}
            className="rounded-lg border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50"
          >
            상세보기
          </button>

          <button
            onClick={() => onJoin?.(baropot.id)}
            disabled={baropot.status !== BaropotStatus.OPEN || isJoining}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              baropot.status === BaropotStatus.OPEN && !isJoining
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-200 text-gray-500'
            }`}
          >
            {isJoining
              ? '참여 중...'
              : baropot.status === BaropotStatus.OPEN
                ? '참여하기'
                : '참여불가'}
          </button>
        </div>
      </div>
    </div>
  );
}
