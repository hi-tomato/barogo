"use client";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useMockNearby } from "@/app/hooks/queries/useMockNearby";
import { RestaurantData } from "@/app/types/restaurant";

interface NearbyRestaurantModalProps {
  onClose: () => void;
  onSelect: (restaurant: RestaurantData) => void;
}

export default function NearbyRestaurantModal({
  onClose,
  onSelect,
}: NearbyRestaurantModalProps) {
  const { location, error, isLoading, getCurrentLocation } = useGeolocation();
  const { data: restaurants = [] } = useMockNearby(location);

  const handleSelect = (restaurant) => {
    const restaurantData: RestaurantData = {
      id: restaurant.id,
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      phone: restaurant.phone || "",
    };
    onSelect(restaurantData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">내 주변 맛집</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {!location && (
            <button
              onClick={getCurrentLocation}
              className="w-full bg-blue-500 text-white py-3 rounded-lg"
            >
              현재 위치 찾기
            </button>
          )}

          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => handleSelect(restaurant)}
              className="w-full p-3 border rounded-lg mb-2 hover:border-blue-300 text-left"
            >
              <h4 className="font-medium">{restaurant.place_name}</h4>
              <p className="text-sm text-gray-500">{restaurant.address_name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
