import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { queryKeys } from "@/app/shared/lib/queryKeys";
import { NearbyRestaurant } from "@/app/shared/types";
import { searchRestaurants } from "../api/searchRestaurantService";

interface UseRestaurantSearchProps {
  lat?: number;
  lng?: number;
}

export const useRestaurantSearch = ({ lat, lng }: UseRestaurantSearchProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const {
    data: result = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.restaurant.search(debouncedQuery, lat!, lng),
    queryFn: async () => searchRestaurants({ query: debouncedQuery, lat, lng }),
    enabled: !!debouncedQuery.trim(),
  });

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  return {
    query,
    setQuery,
    result: result as NearbyRestaurant[],
    loading,
    error: error as Error | null,
    clearSearch,
    refetch,
  };
};
