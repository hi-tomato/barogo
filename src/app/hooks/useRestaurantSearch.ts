import { useEffect, useState } from "react";
import { NearbyRestaurant } from "../types";

interface useRestaurantSearchProps {
  lat?: number;
  lng?: number;
}
export const useRestaurantSearch = ({ lat, lng }: useRestaurantSearchProps) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<NearbyRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRestaurants = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const URL = `/api/search-restaurants?q=${searchQuery}${
        lat && lng ? `&lat=${lat}&lng=${lng}` : ""
      }`;

      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("검색 요청 실패");
      }

      const data = await response.json();
      setResult(data.documents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "검색에 실패했습니다");
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResult([]);
    setError(null);
  };
  useEffect(() => {
    if (!query.trim()) {
      setResult([]);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      searchRestaurants(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, lat, lng]);

  return { query, setQuery, result, loading, error, clearSearch };
};
