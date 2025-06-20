"use client";
import { useState } from "react";
import MapHeaderBar from "./MapHeaderBar";
import KakaoMapView from "./KakaoMapView";

import { useFilteredRestaurants } from "@/app/features/map/hooks/useFilteredRestaurants";
import { Restaurant } from "@/app/shared/types/map";
import { dummyRestaurants } from "@/app/(afterLogin)/map/page";

export default function KaKaoContainer() {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("전체");

  // TODO: 실제 레스토랑 정보를 받아서, filtered에 넘겨줘여함.
  const restaurant = dummyRestaurants;
  const filteredRestaurants = useFilteredRestaurants(
    restaurant,
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
