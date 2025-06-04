import { useEffect } from "react";
import { useLocationStore } from "../store/useLocation";

interface UseLocationOptions {
  autoFetch?: boolean;
  watchPosition?: boolean;
}

export const useLocation = (options: UseLocationOptions = {}) => {
  const { autoFetch = true, watchPosition = false } = options;
  const {
    latitude,
    longitude,
    address,
    loading,
    error,
    lastUpdated,
    getCurrentLocation,
    setLocation,
    setError,
  } = useLocationStore();

  useEffect(() => {
    if (autoFetch && !latitude && !longitude && !loading) {
      getCurrentLocation();
    }
  }, [autoFetch, latitude, longitude, loading, getCurrentLocation]);

  useEffect(() => {
    if (!watchPosition) return;

    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(`위치 추척 실패: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchPosition, setLocation, setError]);

  // 위치가 유효한지 확인
  const hasValidLocation = latitude !== null && longitude !== null;

  // 위치가 오래되었는지 확인 (10분 기준)
  const isLocationStale = lastUpdated
    ? Date.now() - lastUpdated.getTime() > 10 * 60 * 1000
    : true;

  return {
    latitude,
    longitude,
    address,
    loading,
    error,
    lastUpdated,
    hasValidLocation,
    isLocationStale,
    getCurrentLocation,
  };
};
