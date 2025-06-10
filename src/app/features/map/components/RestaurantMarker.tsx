import { getMarkerImage } from "@/app/features/map/hooks/useGetMarker";
import { Restaurant } from "@/app/types/map";
import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
}

export default function RestaurantMarker({
  restaurant,
  isSelected,
  onClick,
}: RestaurantMarkerProps) {
  const markerImage = getMarkerImage(restaurant, isSelected);

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
