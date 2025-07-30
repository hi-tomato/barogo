import { Status } from '@/app/shared/ui';
import { cn } from '@/app/shared/lib/cn';
import React from 'react';
import { HiCheck } from 'react-icons/hi';
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
  onDetailView,
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
                상세페이지 보기
              </button>
            </div>
          </div>
        );

      case 'notServerData':
        return (
          <div className="space-y-4">
            <div className={badgeStyles.info}>
              <span className="font-medium text-blue-700">
                새로운 맛집을 등록해보세요!
              </span>
            </div>

            <div className="flex gap-2">
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
                맛집 등록하기
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
