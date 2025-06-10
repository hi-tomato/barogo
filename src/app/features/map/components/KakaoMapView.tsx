"use client";
import React from "react";
import { Map } from "react-kakao-maps-sdk";
import RestaurantMarker from "./RestaurantMarker";
import UserLocationMarker from "./UserLocationMarker";
import { Restaurant } from "@/app/types/map";
import { useLocationStore } from "../store/useUserLocation";

interface KakaoMapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export default function KakaoMapView({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
}: KakaoMapViewProps) {
  const { latitude, longitude } = useLocationStore();
  const mapCenter =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : { lat: 37.5665, lng: 126.978 };

  return (
    <Map center={mapCenter} style={{ width: "100%", height: "100%" }} level={5}>
      <UserLocationMarker lat={latitude} lng={longitude} />

      {restaurants.map((restaurant) => (
        <RestaurantMarker
          key={restaurant.id}
          restaurant={restaurant}
          isSelected={selectedRestaurant?.id === restaurant.id}
          onClick={() => onRestaurantSelect(restaurant)}
        />
      ))}
    </Map>
  );
}
