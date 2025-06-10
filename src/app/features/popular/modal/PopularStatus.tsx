import React from "react";

interface PopularStatusProps {
  type: "loading" | "error" | "notFound";
}

export default function PopularStatus({ type }: PopularStatusProps) {
  const renderMessage = () => {
    switch (type) {
      case "loading":
        return (
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="text-gray-500">로딩중...</div>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">⚠️</div>
              <div className="text-red-500">
                데이터를 불러오는데 실패했습니다
              </div>
            </div>
          </div>
        );

      case "notFound":
        return (
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl opacity-60">💔</div>
              <div className="text-gray-700 font-semibold">
                찜한 맛집이 없어요
              </div>
              <div className="text-sm text-gray-500">맛집을 찜해보세요!</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderMessage()}</>;
}
