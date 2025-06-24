import Button from "@/app/shared/ui/Button";
import React from "react";

interface RestaurantStatusProps {
  type: "isLoading" | "hasServerData" | "notServerData";
  onClose: () => void;
  onDetailView?: () => void;
  onCreateBaropot?: () => void;
  onRegisterRestaurant?: () => void;
  isRegistering?: boolean;
}

export const RestaurantStatus = ({
  type,
  onClose,
  onDetailView,
  onCreateBaropot,
  onRegisterRestaurant,
  isRegistering = false,
}: RestaurantStatusProps) => {
  const renderContent = () => {
    switch (type) {
      case "isLoading":
        return (
          <div className="flex space-x-3">
            <Button
              text="다시 선택"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            />
            <button
              disabled
              className="flex-1 px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
            >
              확인 중...
            </button>
          </div>
        );

      case "hasServerData":
        return (
          <>
            <button
              onClick={onDetailView}
              className="w-full px-4 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors flex items-center justify-center space-x-2"
            >
              <span>상세페이지</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onCreateBaropot}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>바로팟 만들기</span>
              </button>
            </div>
          </>
        );

      case "notServerData":
        return (
          <>
            <button
              onClick={onRegisterRestaurant}
              disabled={isRegistering}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>📝</span>
              <span>{isRegistering ? "등록 중..." : "맛집 등록하기"}</span>
            </button>

            <div className="flex space-x-3">
              <Button
                text="다시 선택"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              />
              <button
                onClick={onCreateBaropot}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>⚡</span>
                <span>바로팟 만들기</span>
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-3">{renderContent()}</div>;
};

// 검색 관련
interface SearchStatusProps {
  type: "loading" | "error" | "emptyResults";
  error?: string;
  query?: string;
}
export const SearchStatus = ({ type, error, query }: SearchStatusProps) => {
  const render = () => {
    switch (type) {
      case "loading":
        return (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">검색 중...</p>
          </div>
        );
      case "error":
        return (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">⚠️</span>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        );
      case "emptyResults":
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색에 대한 등록된 결과가 없습니다.
            </h3>
            <p className="text-gray-500 text-sm">다른 키워드로 검색해보세요</p>
          </div>
        );
      default:
        return null;
    }
  };
  return <>{render()}</>;
};
