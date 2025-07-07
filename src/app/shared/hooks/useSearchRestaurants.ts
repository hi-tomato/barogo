import { useCallback, useState } from 'react';
import { KakaoRestaurant } from '@/app/shared/types/kakao';

export const useSearchRestaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<KakaoRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRestaurants = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search-restaurants?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('검색 실패');
      }

      const data = await response.json();
      setSearchResults(data.documents || []);
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchRestaurants(searchQuery);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    searchRestaurants,
    handleKeyPress,
  };
};
