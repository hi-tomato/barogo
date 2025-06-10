export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface LocationActions {
  setLocation: (lat: number, lng: number) => void;
  setAddress: (address: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getCurrentLocation: () => Promise<void>;
  clearLocation: () => void;
  saveLocationFromGeolocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
}

export type LocationStore = LocationState & LocationActions;
