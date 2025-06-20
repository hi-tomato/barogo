import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/features/nearby/utils/categoryHelpers";
import { NearbyRestaurant } from "@/app/shared/types";
import { SearchStatus } from "./Status";

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
          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                restaurant.category_name
              )} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}
            >
              <span className="text-white text-lg">
                {getCategoryIcon(restaurant.category_name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {restaurant.place_name}
              </h4>
              <p className="text-sm text-gray-600 truncate">
                {restaurant.category_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                📍 {restaurant.address_name}
              </p>
            </div>
            <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
              →
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
