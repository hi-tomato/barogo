import { useState, useCallback, useEffect } from "react";
import { Location } from "@/app/shared/types";

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("위치 서비스를 지원하지 않습니다");
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
        setError("위치 권한을 허용해주세요");
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
