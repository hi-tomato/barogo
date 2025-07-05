import Button from '@/app/shared/ui/Button';
import { Status } from '@/app/shared/ui';
import React from 'react';

interface RestaurantStatusProps {
  type: 'isLoading' | 'hasServerData' | 'notServerData';
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
      case 'isLoading':
        return (
          <div className="flex space-x-3">
            <Button
              text="다시 선택"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            />
            <button
              disabled
              className="flex-1 cursor-not-allowed rounded-lg bg-gray-300 px-4 py-3 text-gray-500"
            >
              확인 중...
            </button>
          </div>
        );

      case 'hasServerData':
        return (
          <>
            <button
              onClick={onDetailView}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-[#1C4E80] px-4 py-3 text-white transition-colors hover:bg-[#154066]"
            >
              <span>상세페이지</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onCreateBaropot}
                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 text-white transition-all hover:shadow-md"
              >
                <span>바로팟 만들기</span>
              </button>
            </div>
          </>
        );

      case 'notServerData':
        return (
          <>
            <button
              onClick={onRegisterRestaurant}
              disabled={isRegistering}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              <span>{isRegistering ? '등록 중...' : '맛집 등록하기'}</span>
            </button>

            <div className="flex space-x-3">
              <Button
                text="다시 선택"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
              />
              <button
                onClick={onCreateBaropot}
                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 text-white transition-all hover:shadow-md"
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
  type: 'loading' | 'error' | 'emptyResults';
  error?: string;
  query?: string;
}
export const SearchStatus = ({ type, error, query }: SearchStatusProps) => {
  if (type === 'loading') {
    return <Status type="loading" title="검색 중..." size="lg" />;
  }
  if (type === 'error') {
    return (
      <Status
        type="error"
        icon="⚠️"
        title="검색 오류"
        message={error}
        className="rounded-xl border border-red-200 bg-red-50 p-4"
        size="md"
      />
    );
  }
  if (type === 'emptyResults') {
    return (
      <Status
        type="empty"
        icon="🔍"
        title="검색에 대한 등록된 결과가 없습니다."
        message="다른 키워드로 검색해보세요"
        size="lg"
      />
    );
  }
  return null;
};
