'use client';
import { getStatusColor, getStatusText } from '../../hooks/useBaropotStatus';
import { Button } from '@/app/shared/ui';
import { BaropotListResponse } from '@/app/shared/types/baropots';

interface GridProps {
  baropotList: BaropotListResponse[];
  onJoin: (id: number) => void;
  onDetail: (id: number) => void;
}

export default function BaropotTableGrid({
  baropotList,
  onJoin,
  onDetail,
}: GridProps) {
  if (baropotList.length === 0)
    return (
      <div className="mx-4 mt-4">
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <div className="mb-4 text-6xl">��</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            조건에 맞는 바로팟이 없어요
          </h3>
          <p className="text-sm text-gray-500">
            검색 조건을 변경하거나 새로운 바로팟을 만들어보세요!
          </p>
        </div>
      </div>
    );

  return (
    <div className="mx-4 mt-4 pb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {baropotList.map((baropot) => {
          const progressPercentage =
            (baropot.participantCount / baropot.maxParticipants) * 100;
          const isUrgent = progressPercentage >= 75; // 75% 이상일 때 긴급

          return (
            <div
              key={baropot.id}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center space-x-2">
                    <h3 className="text-base leading-tight font-semibold text-gray-900">
                      {baropot.title}
                    </h3>
                    {isUrgent && (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                        🔥
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        baropot.status
                      )}`}
                    >
                      {getStatusText(baropot.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-sm font-bold text-gray-900">
                      {baropot.participantCount}/{baropot.maxParticipants}명
                    </div>
                    <div className="h-2 w-16 rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${
                          isUrgent ? 'bg-red-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="mb-3 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2 h-4 w-4">📍</span>
                  <span className="truncate">{baropot.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 h-4 w-4">🕐</span>
                  <span>
                    {baropot.date} {baropot.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 h-4 w-4">👤</span>
                  <span className="truncate">{baropot.host.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 h-4 w-4">🍽️</span>
                  <span className="truncate">{baropot.restaurant.name}</span>
                </div>
              </div>
              {/* 태그 */}
              <div className="mb-4 flex flex-wrap gap-1">
                {baropot.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
                {baropot.tags.length > 3 && (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    +{baropot.tags.length - 3}
                  </span>
                )}
              </div>
              {/* 액션 버튼 */}
              <div className="flex space-x-2">
                <Button
                  text="상세보기"
                  onClick={() => onDetail(baropot.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                />
                <Button
                  text={baropot.status === 'OPEN' ? '참여하기' : '참여불가'}
                  onClick={() => onJoin(baropot.id)}
                  disabled={baropot.status !== 'OPEN'}
                  variant="gradient"
                  size="sm"
                  className="flex-1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
