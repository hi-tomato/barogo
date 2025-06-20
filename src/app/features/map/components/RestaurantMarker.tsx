import { getMarkerImage } from "@/app/features/map/hooks/useGetMarker";
import { Restaurant } from "@/app/shared/types/map";

import { MapMarker } from "react-kakao-maps-sdk";

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantMarker({
  restaurant,
  onClick,
}: RestaurantMarkerProps) {
  const markerImage = getMarkerImage(restaurant);
  return (
    <>
      <MapMarker
        position={{ lat: restaurant.lat, lng: restaurant.lng }}
        onClick={onClick}
        image={markerImage}
      />
    </>
  );
}
