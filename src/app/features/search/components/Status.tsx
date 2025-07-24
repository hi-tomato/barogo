import Button from '@/app/shared/ui/Button';
import { Status } from '@/app/shared/ui';
import React from 'react';
import {
  HiEye,
  HiPlus,
  HiArrowLeft,
  HiLightningBolt,
  HiCheck,
  HiClock,
} from 'react-icons/hi';

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
          <div className="space-y-4">
            {/* 로딩 스켈레톤 */}
            <div className="flex items-center justify-center space-x-3 rounded-xl bg-gray-50 p-4">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="font-medium text-gray-600">
                정보를 확인하고 있습니다...
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center space-x-2 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95"
              >
                <HiArrowLeft size={18} />
                <span>다시 선택</span>
              </button>

              <button
                disabled
                className="flex flex-1 cursor-not-allowed items-center justify-center space-x-2 rounded-xl bg-gray-200 px-4 py-3 text-gray-500"
              >
                <HiClock size={18} />
                <span>확인 중...</span>
              </button>
            </div>
          </div>
        );

      case 'hasServerData':
        return (
          <div className="space-y-4">
            {/* 성공 배지 */}
            <div className="flex items-center justify-center space-x-2 rounded-xl border border-green-200 bg-green-50 p-3">
              <HiCheck size={20} className="text-green-600" />
              <span className="font-medium text-green-700">
                등록된 맛집입니다!
              </span>
            </div>

            <div className="flex gap-2">
              {/* 상세보기 버튼 */}
              <button
                onClick={onDetailView}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95"
              >
                <span>상세페이지 보기</span>
              </button>

              {/* 바로팟 만들기 버튼 */}
              <button
                onClick={onCreateBaropot}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 px-4 py-4 font-medium text-white transition-all duration-200 hover:from-orange-500 hover:to-red-600 hover:shadow-lg active:scale-95"
              >
                <span>바로팟 만들기</span>
              </button>
            </div>
          </div>
        );

      case 'notServerData':
        return (
          <div className="space-y-4">
            {/* 안내 메시지 */}
            <div className="flex items-center justify-center space-x-2 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <HiPlus size={20} className="text-blue-600" />
              <span className="font-medium text-blue-700">
                새로운 맛집을 등록해보세요!
              </span>
            </div>

            {/* 맛집 등록 버튼 */}
            <button
              onClick={onRegisterRestaurant}
              disabled={isRegistering}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-4 font-medium text-white transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRegistering ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  <span>등록 중...</span>
                </>
              ) : (
                <>
                  <HiPlus size={20} />
                  <span>맛집 등록하기</span>
                </>
              )}
            </button>

            {/* 하단 버튼들 */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex flex-1 items-center justify-center space-x-2 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95"
              >
                <HiArrowLeft size={18} />
                <span>다시 선택</span>
              </button>

              <button
                onClick={onCreateBaropot}
                className="flex flex-1 items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 px-4 py-3 font-medium text-white transition-all duration-200 hover:from-orange-500 hover:to-red-600 hover:shadow-lg active:scale-95"
              >
                <HiLightningBolt size={18} />
                <span>바로팟 만들기</span>
              </button>
            </div>
          </div>
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
    return (
      <div className="flex items-center justify-center p-8">
        <Status type="loading" title="검색 중..." size="lg" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <Status
          type="error"
          icon="⚠️"
          title="검색 오류"
          message={error}
          size="md"
        />
      </div>
    );
  }

  if (type === 'emptyResults') {
    return (
      <div className="p-8 text-center">
        <Status
          type="empty"
          icon=""
          title="검색에 대한 등록된 결과가 없습니다."
          message="다른 키워드로 검색해보세요"
          size="lg"
        />
      </div>
    );
  }

  return null;
};
