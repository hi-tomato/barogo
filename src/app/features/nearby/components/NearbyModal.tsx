"use client";
import { useEffect } from "react";
import { useGeolocation } from "@/app/shared/hooks/useGeolocation";
import { useMockNearby } from "@/app/features/nearby/hooks/queries/useMockNearby";
import RestaurantList from "@/app/features/nearby/modal/RestaurantList";
import NearbyStatus from "@/app/features/nearby/modal/NearbyStatus";
import NearbyHeader from "@/app/features/nearby/modal/NearbyHeader";
import { useLocationStore } from "../../map/store/useUserLocation";

export default function NearbyModal() {
  const { saveLocationFromGeolocation } = useLocationStore();

  // 현재 위치를 받아오는 Hooks
  const {
    location,
    error: locationError,
    isLoading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();

  useEffect(() => {
    if (location) {
      saveLocationFromGeolocation(location);
    }
  }, [location, saveLocationFromGeolocation]);

  const {
    data: restaurants = [],
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useMockNearby(location);

  const isLoading = locationLoading || restaurantsLoading;
  const error = locationError || restaurantsError?.message;

  return (
    <div className="fixed inset-0 bg-[#0000004c] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <NearbyHeader />
        {/* 컨텐츠 */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {!location && (
            <NearbyStatus
              type="locationButton"
              onAction={getCurrentLocation}
              loading={locationLoading}
            />
          )}
          {/* Status Messages */}
          {locationError && (
            <NearbyStatus type="error" message={locationError} />
          )}
          {isLoading && location && <NearbyStatus type="loading" />}

          {error && <NearbyStatus type="error" message={error} />}

          {location && !isLoading && restaurants.length === 0 && (
            <NearbyStatus type="notFound" />
          )}

          {/* onCreateBaropot props 제거 */}
          <RestaurantList restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}
