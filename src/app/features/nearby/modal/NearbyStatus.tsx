interface StatusMessageProps {
  type: "loading" | "error" | "notFound" | "locationButton";
  message?: string;
  onAction?: () => void;
  loading?: boolean;
}

export default function NearbyStatus({
  type,
  message,
  onAction,
  loading,
}: StatusMessageProps) {
  const renderContents = () => {
    switch (type) {
      case "loading":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="text-gray-600 font-medium">맛집을 찾는 중...</div>
            <div className="text-sm text-gray-400">잠시만 기다려주세요</div>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <div className="text-red-500 font-medium">{message}</div>
          </div>
        );

      case "notFound":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl opacity-60">🔍</div>
            <div className="text-gray-700 font-semibold text-lg">
              주변에 맛집이 없어요
            </div>
            <div className="text-sm text-gray-500 max-w-xs leading-relaxed">
              다른 지역을 검색하거나
              <br />
              검색 범위를 넓혀보세요
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              💡 팁: 위치를 다시 확인해보세요
            </span>
          </div>
        );

      case "locationButton":
        return (
          <button
            onClick={onAction}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? "위치 찾는 중..." : "현재 위치 찾기"}
          </button>
        );
    }
  };

  return <div className="text-center py-8">{renderContents()}</div>;
}
