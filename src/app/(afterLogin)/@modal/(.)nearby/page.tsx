"use client";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useMockNearby } from "@/app/hooks/queries/useMockNearby";
import { NearbyRestaurant } from "@/app/types";
import { useEffect } from "react";
import { useLocationStore } from "@/app/store/useUserLocation";
import { useBaropotStore } from "@/app/store/useBaropotStore";
import NearbyHeader from "@/app/components/nearby/modal/NearbyHeader";
import NearbyStatus from "@/app/components/nearby/modal/NearbyStatus";
import RestaurantList from "@/app/components/nearby/RestaurantList";

export default function NearbyModal() {
  const { saveLocationFromGeolocation } = useLocationStore();
  const { setSelectedRestaurant } = useBaropotStore();

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

  const handleCreateBaropot = (restaurant: NearbyRestaurant) => {
    // TODO: 바로팟 만들기 로직
    setSelectedRestaurant(restaurant);
    sessionStorage.setItem(
      "selectedRestaurant",
      JSON.stringify({
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || "",
      })
    );
    window.location.href = `/baropot/create/${restaurant.id}`;
  };

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

          <RestaurantList
            restaurants={restaurants}
            onCreateBaropot={handleCreateBaropot}
          />
        </div>
      </div>
    </div>
  );
}
