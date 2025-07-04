import { useMemo } from "react";
import { Restaurant } from "@/app/shared/types/restaurant";

export function useFilteredRestaurants(
  restaurants: Restaurant[],
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
