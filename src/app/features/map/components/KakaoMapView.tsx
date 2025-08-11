'use client';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import RestaurantMarker from './RestaurantMarker';
import UserLocationMarker from './UserLocationMarker';
import { Restaurant } from '@/app/shared/types/restaurant';
import { useLocationStore } from '../store/useUserLocation';
import RestaurantPopup from './RestaurantPopup';
import { useEffect, useRef, useState } from 'react';
import {
  KAKAO_MAP_CLUSTER_STYLES,
  KAKAO_MAP_CURRENT_CENTER,
  KAKAO_MAP_DEFAULT_CENTER,
} from '../util/kakao_cluster';

interface KakaoMapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onClosePopup: () => void;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export default function KakaoMapView({
  restaurants,
  selectedRestaurant,
  onClosePopup,
  onRestaurantSelect,
}: KakaoMapViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude } = useLocationStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) {
    return (
      <div
        ref={mapRef}
        className="flex h-full w-full items-center justify-center bg-gray-100"
      >
        <div className="text-gray-500">지도를 로드하는 중...</div>
      </div>
    );
  }

  return (
    <Map
      center={KAKAO_MAP_CURRENT_CENTER(
        latitude || KAKAO_MAP_DEFAULT_CENTER.lat,
        longitude || KAKAO_MAP_DEFAULT_CENTER.lng
      )}
      style={{ width: '100%', height: '100%' }}
      level={4}
      draggable={true}
      zoomable={true}
      scrollwheel={false}
      className="map-container kakao-map"
    >
      <UserLocationMarker lat={latitude} lng={longitude} />

      <MarkerClusterer
        averageCenter={true}
        minClusterSize={2}
        disableClickZoom={false}
        calculator={[10, 30, 50]}
        styles={KAKAO_MAP_CLUSTER_STYLES}
      >
        {restaurants.map((restaurant) => (
          <RestaurantMarker
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onRestaurantSelect(restaurant)}
          />
        ))}
      </MarkerClusterer>

      {selectedRestaurant && (
        <RestaurantPopup
          restaurant={selectedRestaurant}
          onClose={onClosePopup}
        />
      )}
    </Map>
  );
}
