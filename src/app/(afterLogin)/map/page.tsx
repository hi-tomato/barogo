"use client";
import { useLocationStore } from "@/app/store/useUserLocation";
import React, { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export default function KakaoMapView() {
  const { latitude, longitude, getCurrentLocation, loading } =
    useLocationStore();
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const mapCenter =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : { lat: 37.5665, lng: 126.978 };

  useEffect(() => {
    if (!latitude || !longitude) {
      getCurrentLocation();
    }
  }, []);

  if (loading || !latitude || !longitude) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Map
        center={mapCenter}
        style={{ width: "100%", height: "100%" }}
        level={5}
      >
        {/* 유저 현재 위치 */}
        <MapMarker position={{ lat: latitude, lng: longitude }}>
          <div className="text-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow border text-[12px] font-medium text-blue-600">
            <span>📍</span>
            <span>내 위치</span>
          </div>
        </MapMarker>

        {/* 맛집 마커들 */}
        {dummyRestaurants.map((store) => (
          <MapMarker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => setSelected(store)}
          />
        ))}

        {/* 팝업 오버레이 */}
        {selected && (
          <CustomOverlayMap position={{ lat: selected.lat, lng: selected.lng }}>
            <div className="relative w-[220px] bg-white rounded-xl shadow-xl border border-gray-200 p-3 text-sm">
              <div className="font-bold text-base text-gray-800 mb-1">
                {selected.name}
              </div>
              <p className="text-gray-500 line-clamp-2">
                {selected.description}
              </p>

              <button
                onClick={() => alert("상세 페이지로 이동")}
                className="mt-3 w-full text-center bg-blue-500 text-white text-xs py-1 rounded-lg hover:bg-blue-600 transition"
              >
                상세보기 →
              </button>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
}

const dummyRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "토마토김밥",
    lat: 37.5665,
    lng: 126.978,
    description: "김밥계의 샤넬. 언제나 옳은 맛",
  },
  {
    id: 2,
    name: "마라탕의 전설",
    lat: 37.5655,
    lng: 126.976,
    description: "중독주의! 얼얼한 마라의 세계",
  },
];
