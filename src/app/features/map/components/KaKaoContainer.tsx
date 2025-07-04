"use client";
import { useState } from "react";
import MapHeaderBar from "./MapHeaderBar";
import KakaoMapView from "./KakaoMapView";

import { useFilteredRestaurants } from "@/app/features/map/hooks/useFilteredRestaurants";
import { Restaurant } from "@/app/shared/types/restaurant";
import { useRestaurantList } from "@/app/shared/hooks/queries/useRestaurant";

export default function KaKaoContainer() {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("전체");

  // 실제 레스토랑 정보를 API에서 가져옴
  const { data: restaurants = [] } = useRestaurantList();
  const filteredRestaurants = useFilteredRestaurants(
    restaurants,
    categoryFilter
  );
  const handleClosePopup = () => {
    setSelected(null);
  };
  return (
    <div className="relative h-screen w-full">
      <MapHeaderBar
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        resultCount={filteredRestaurants.length}
      />

      {/* <MapLocationButton /> */}
      <KakaoMapView
        restaurants={filteredRestaurants}
        selectedRestaurant={selected}
        onRestaurantSelect={setSelected}
        onClosePopup={handleClosePopup}
      />
    </div>
  );
}
