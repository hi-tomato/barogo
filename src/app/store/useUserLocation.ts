import { create } from "zustand";
import { LocationStore } from "@/app/types/location";

export const useLocationStore = create<LocationStore>((set, get) => ({
  latitude: null,
  longitude: null,
  address: null,
  loading: false,
  error: null,
  lastUpdated: null,

  // Actions
  setLocation: (lat: number, lng: number) => {
    set({
      latitude: lat,
      longitude: lng,
      lastUpdated: new Date(),
      error: null,
    });
  },

  setAddress: (address: string) => {
    set({ address });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error, loading: false });
  },

  getCurrentLocation: async () => {
    const { setLocation, setLoading, setError } = get();

    if (!navigator.geolocation) {
      setError("위치 서비스를 지원하지 않는 브라우저입니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5분 캐시
          });
        }
      );

      setLocation(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      const errorMessage =
        error instanceof GeolocationPositionError
          ? getGeolocationErrorMessage(error.code)
          : "위치를 가져오는데 실패했습니다.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },

  clearLocation: () => {
    set({
      latitude: null,
      longitude: null,
      address: null,
      loading: false,
      error: null,
      lastUpdated: null,
    });
  },

  saveLocationFromGeolocation: (location) => {
    set({
      latitude: location.latitude,
      longitude: location.longitude,
      lastUpdated: new Date(),
      error: null,
    });
  },
}));

function getGeolocationErrorMessage(code: number): string {
  switch (code) {
    case 1:
      return "위치 접근이 거부되었습니다. 브라우저 설정에서 위치 접근을 허용해주세요.";
    case 2:
      return "위치를 확인할 수 없습니다.";
    case 3:
      return "위치 요청 시간이 초과되었습니다.";
    default:
      return "위치를 가져오는데 실패했습니다.";
  }
}
