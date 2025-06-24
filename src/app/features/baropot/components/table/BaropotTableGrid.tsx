"use client";
import { getStatusColor, getStatusText } from "../../hooks/useBaropotStatus";
import Button from "@/app/shared/ui/Button";
import { BaropotListResponse } from "@/app/shared/types/baropots";

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
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">��</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            조건에 맞는 바로팟이 없어요
          </h3>
          <p className="text-gray-500 text-sm">
            검색 조건을 변경하거나 새로운 바로팟을 만들어보세요!
          </p>
        </div>
      </div>
    );

  return (
    <div className="mx-4 mt-4 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {baropotList.map((baropot) => {
          const progressPercentage =
            (baropot.participantCount / baropot.maxParticipants) * 100;
          const isUrgent = progressPercentage >= 75; // 75% 이상일 때 긴급

          return (
            <div
              key={baropot.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {baropot.title}
                    </h3>
                    {isUrgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        🔥
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        baropot.status
                      )}`}
                    >
                      {getStatusText(baropot.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 mb-1">
                      {baropot.participantCount}/{baropot.maxParticipants}명
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isUrgent ? "bg-red-500" : "bg-orange-500"
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="space-y-1 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">📍</span>
                  <span className="truncate">{baropot.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">🕐</span>
                  <span>
                    {baropot.date} {baropot.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">👤</span>
                  <span className="truncate">{baropot.host.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">🍽️</span>
                  <span className="truncate">{baropot.restaurant.name}</span>
                </div>
              </div>
              {/* 태그 */}
              <div className="flex flex-wrap gap-1 mb-4">
                {baropot.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {baropot.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{baropot.tags.length - 3}
                  </span>
                )}
              </div>
              {/* 액션 버튼 */}
              <div className="flex space-x-2">
                <Button
                  text="상세보기"
                  onClick={() => onDetail(baropot.id)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                />
                <Button
                  text={baropot.status === "OPEN" ? "참여하기" : "참여불가"}
                  onClick={() => onJoin(baropot.id)}
                  disabled={baropot.status !== "OPEN"}
                  className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
