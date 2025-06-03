// src/app/hooks/useGeolocation.ts
import { useState } from "react";
import { Location } from "@/app/types";

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("위치 서비스를 지원하지 않습니다");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        setError("위치 권한을 허용해주세요");
        setIsLoading(false);
      }
    );
  };

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
  };
};
