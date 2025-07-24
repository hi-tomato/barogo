import { RestaurantStatus } from '../Status';
import React from 'react';

interface RestaurantActionButtonsProps {
  isProcessing: boolean;
  hasServerData: boolean;
  onClose: () => void;
  handleDetailView: () => void;
  handleCreateBaropot: () => void;
  handleRegisterRestaurant: () => void;
}
export default function RestaurantActionButtons({
  isProcessing,
  hasServerData,
  onClose,
  handleDetailView,
  handleCreateBaropot,
  handleRegisterRestaurant,
}: RestaurantActionButtonsProps) {
  return (
    <div className="animate-fadeInUp space-y-3">
      {/* 로딩 중일 때 */}
      {isProcessing && <RestaurantStatus type="isLoading" onClose={onClose} />}

      {/* 서버에 데이터가 있을 때 */}
      {!isProcessing && hasServerData && (
        <RestaurantStatus
          type="hasServerData"
          onClose={onClose}
          onDetailView={handleDetailView}
          onCreateBaropot={handleCreateBaropot}
        />
      )}

      {/* 서버에 데이터가 없을 때 */}
      {!isProcessing && !hasServerData && (
        <RestaurantStatus
          type="notServerData"
          onClose={onClose}
          onRegisterRestaurant={handleRegisterRestaurant}
          onCreateBaropot={handleCreateBaropot}
          isRegistering={isProcessing}
        />
      )}
    </div>
  );
}
