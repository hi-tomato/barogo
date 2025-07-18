import { useState, useCallback, useEffect } from 'react';
import { Location } from '@/app/shared/types';

const GEOLOCATION_MESSAGES = {
  LOADING: '위치 정보를 가져오는 중...',
  SUCCESS: '위치 정보를 성공적으로 가져왔습니다',
  ERROR_NO_SUPPORT: '위치 서비스를 지원하지 않습니다',
  ERROR_PERMISSION: '위치 권한을 허용해주세요',
  ERROR_TIMEOUT: '위치 정보 가져오기 시간이 초과되었습니다',
  ERROR_UNAVAILABLE: '위치 정보를 사용할 수 없습니다',
} as const;

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(GEOLOCATION_MESSAGES.ERROR_NO_SUPPORT);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        setError(GEOLOCATION_MESSAGES.ERROR_PERMISSION);
        setIsLoading(false);
      }
    );
  }, []);

  // 컴포넌트 마운트 시 자동으로 위치 정보 가져오기
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
  };
};
