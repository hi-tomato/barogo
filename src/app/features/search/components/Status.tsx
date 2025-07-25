import { Status } from '@/app/shared/ui';
import { cn } from '@/app/shared/lib/cn';
import React from 'react';
import {
  HiPlus,
  HiArrowLeft,
  HiLightningBolt,
  HiCheck,
  HiClock,
} from 'react-icons/hi';
import { buttonStyles, badgeStyles } from '../util/confirmModal';

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
            <Status
              type="loading"
              title="정보를 확인하고 있습니다..."
              size="md"
              variant="inline"
            />

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.md,
                  buttonStyles.variant.outline
                )}
              >
                <HiArrowLeft size={18} />
                <span>다시 선택</span>
              </button>

              <button
                disabled
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.md,
                  buttonStyles.variant.secondary
                )}
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
            <div className={badgeStyles.success}>
              <HiCheck size={20} className="text-green-600" />
              <span className="font-medium text-green-700">
                등록된 맛집입니다!
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onDetailView}
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.lg,
                  buttonStyles.variant.primary,
                  buttonStyles.fullWidth
                )}
              >
                <span>상세페이지 보기</span>
              </button>

              <button
                onClick={onCreateBaropot}
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.lg,
                  buttonStyles.variant.warning,
                  buttonStyles.fullWidth
                )}
              >
                <span>바로팟 만들기</span>
              </button>
            </div>
          </div>
        );

      case 'notServerData':
        return (
          <div className="space-y-4">
            <div className={badgeStyles.info}>
              <HiPlus size={20} className="text-blue-600" />
              <span className="font-medium text-blue-700">
                새로운 맛집을 등록해보세요!
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {/* 맛집 등록 버튼 */}
              <button
                onClick={onRegisterRestaurant}
                disabled={isRegistering}
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.lg,
                  buttonStyles.variant.success,
                  buttonStyles.fullWidth
                )}
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
                  onClick={onCreateBaropot}
                  className={cn(
                    buttonStyles.base,
                    buttonStyles.size.md,
                    buttonStyles.variant.warning,
                    buttonStyles.fullWidth
                  )}
                >
                  <HiLightningBolt size={18} />
                  <span>바로팟 만들기</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-3">{renderContent()}</div>;
};
