import { getMarkerImage } from '@/app/features/map/hooks/useGetMarker';
import { Restaurant } from '@/app/shared/types/restaurant';
import { memo } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  onClick: () => void;
}

function RestaurantMarker({ restaurant, onClick }: RestaurantMarkerProps) {
  const markerImage = getMarkerImage(restaurant);
  return (
    <MapMarker
      position={{ lat: restaurant.lat, lng: restaurant.lng }}
      onClick={onClick}
      image={markerImage}
    />
  );
}

export default memo(RestaurantMarker);
