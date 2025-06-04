import { getStatusColor, getStatusText } from "@/app/hooks/useBaropotStatus";
import { BaropotItem } from "@/app/types";

interface BaropotItemProps {
  baropot: BaropotItem;
  onJoin?: (id: number) => void;
}

export default function BaropotItems({ baropot, onJoin }: BaropotItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900">{baropot.title}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                baropot.status
              )}`}
            >
              {getStatusText(baropot.status)}
            </span>
          </div>
          <p className="text-sm text-gray-600">@{baropot.restaurant}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {baropot.currentPeople}/{baropot.maxPeople}명
          </div>
          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${(baropot.currentPeople / baropot.maxPeople) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 정보 */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2">📍</span>
          {baropot.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2">🕐</span>
          {baropot.date} {baropot.time}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2">👤</span>
          호스트: {baropot.host}
        </div>
      </div>

      {/* 태그 & 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {baropot.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onJoin?.(baropot.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            baropot.status === "recruiting"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={baropot.status !== "recruiting"}
        >
          {baropot.status === "recruiting" ? "참여하기" : "참여불가"}
        </button>
      </div>
    </div>
  );
}
