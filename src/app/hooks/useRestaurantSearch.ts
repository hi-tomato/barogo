import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { NearbyRestaurant } from "@/app/types";

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
    queryKey: ["restaurants", debouncedQuery, lat, lng],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];

      const url = `/api/search-restaurants?q=${encodeURIComponent(
        debouncedQuery
      )}${lat && lng ? `&lat=${lat}&lng=${lng}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("검색 요청 실패");
      }

      const data = await response.json();
      return data.documents || [];
    },
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
