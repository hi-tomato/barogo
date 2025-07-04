import { useMemo } from "react";
import { RestaurantMap } from "@/app/shared/types";

export function useFilteredRestaurants(
  restaurants: RestaurantMap[],
  categoryFilter: string
) {
  return useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesCategory =
        categoryFilter === "전체" || restaurant.category === categoryFilter;
      return matchesCategory;
    });
  }, [restaurants, categoryFilter]); // dependencies에 추가
}
