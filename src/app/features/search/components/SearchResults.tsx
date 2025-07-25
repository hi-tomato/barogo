import {
  getCategoryIcon,
  getGradientByCategory,
} from '@/app/features/nearby/utils/categoryHelpers';
import { NearbyRestaurant } from '@/app/shared/types';
import { SearchStatus } from './SearchStatus';

interface SearchResultsProps {
  results: NearbyRestaurant[];
  loading: boolean;
  error: string | null;
  onSelectRestaurant: (restaurant: NearbyRestaurant) => void;
}

export default function SearchResults({
  results,
  loading,
  error,
  onSelectRestaurant,
}: SearchResultsProps) {
  if (loading) return <SearchStatus type="loading" />;
  if (error) return <SearchStatus type="error" error={error} />;
  if (results.length === 0) return <SearchStatus type="emptyResults" />;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">
          검색 결과 ({results.length.toLocaleString()}개)
        </h3>
        <button className="text-sm text-blue-600 hover:underline">
          필터 설정
        </button>
      </div>

      {results.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => onSelectRestaurant(restaurant)}
          className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`h-12 w-12 bg-gradient-to-br ${getGradientByCategory(
                restaurant.category_name
              )} flex items-center justify-center rounded-lg transition-transform group-hover:scale-105`}
            >
              <span className="text-lg text-white">
                {getCategoryIcon(restaurant.category_name)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                {restaurant.place_name}
              </h4>
              <p className="truncate text-sm text-gray-600">
                {restaurant.category_name}
              </p>
              <p className="truncate text-xs text-gray-500">
                📍 {restaurant.address_name}
              </p>
            </div>
            <div className="text-gray-400 transition-colors group-hover:text-blue-500">
              →
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
