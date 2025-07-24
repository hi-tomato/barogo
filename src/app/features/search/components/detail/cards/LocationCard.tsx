'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { Button, StateDisplay } from '@/app/shared/ui';
import { Map } from 'react-kakao-maps-sdk';
import UserLocationMarker from '@/app/features/map/components/UserLocationMarker';
import { useLocationStore } from '@/app/features/map/store/useUserLocation';
import { useToast } from '@/app/shared/hooks/useToast';
import {
  calculateHaversineDistance,
  formatDistance,
} from '@/app/features/map/util/calculateDistance';

interface LocationCardProps {
  restaurant: RestaurantDetail;
}

export default function LocationCard({ restaurant }: LocationCardProps) {
  const toast = useToast();
  const mapCenter = { lat: restaurant.lat, lng: restaurant.lng };
  const [distance, setDistance] = useState<string | null>(null);
  const [showDistance, setShowDistance] = useState(false);
  const { latitude, longitude, getCurrentLocation, loading } =
    useLocationStore();

  const handleCurrentGeolocation = async () => {
    try {
      await getCurrentLocation();
      setShowDistance(true);
      toast.success('현재의 위치를 성공적으로 찾았습니다.');
    } catch (_) {
      toast.error('현재 위치를 찾을 수 없습니다.');
    }
  };

  const handleCalculateDistance = () => {
    if (!latitude || !longitude) {
      toast.error('현재 위치를 먼저 확인해주세요!');
      return;
    }

    const distanceInMeters = calculateHaversineDistance(
      latitude,
      longitude,
      restaurant.lat,
      restaurant.lng
    );

    const formattedDistance = formatDistance(distanceInMeters);
    setDistance(formattedDistance);
    setShowDistance(true);

    toast.success(`거리가 계산이 완료되었습니다. ${formattedDistance}`);
  };

  return (
    <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="mb-4 flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
          <HiLocationMarker className="text-white" size={18} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">주소</p>
          <p className="font-semibold text-gray-800">{restaurant.address}</p>
          {showDistance && (
            <p className="text-[14px] text-gray-400">
              현재 위치로부터 약 {distance}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <Button
          text="내 위치 확인하기"
          disabled={loading}
          onClick={handleCurrentGeolocation}
          className="w-full rounded-xl bg-blue-500 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-600"
        >
          {loading ? (
            <StateDisplay state="loading" size="md" />
          ) : (
            <span>
              {showDistance ? '위치 다시 확인' : '내 위치에서 거리 확인'}
            </span>
          )}
        </Button>
        <button
          onClick={handleCalculateDistance}
          className="w-full rounded-xl border border-blue-200 bg-white py-3 font-medium text-blue-500 transition-colors duration-200 hover:bg-blue-50"
        >
          길찾기
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="h-64 w-full">
            {/* TODO: 브랜치가 업데이트가 되면, 현재 위치를 받아오는 애니메이션 추가 */}
            <Map
              center={mapCenter}
              style={{ width: '100%', height: '100%' }}
              level={3}
            >
              <UserLocationMarker lat={restaurant.lat} lng={restaurant.lng} />
            </Map>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
