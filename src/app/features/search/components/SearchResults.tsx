import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/features/nearby/utils/categoryHelpers";
import { NearbyRestaurant } from "@/app/shared/types";

interface SearchResultsProps {
  results: NearbyRestaurant[];
  loading: boolean;
  error: string | null;
  onSelectRestaurant: (restaurant: NearbyRestaurant) => void;
}

const Loading = () => (
  <div className="text-center py-12">
    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
    <p className="text-gray-500">검색 중...</p>
  </div>
);

const Error = ({ error }: { error: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
    <div className="flex items-center space-x-2">
      <span className="text-red-500">⚠️</span>
      <p className="text-red-600 text-sm">{error}</p>
    </div>
  </div>
);

const EmptyResults = ({ query }: { query: string }) => (
  <div className="text-center py-12">
    <div className="text-4xl mb-4">🔍</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {query}에 대한 검색 결과가 없습니다
    </h3>
    <p className="text-gray-500 text-sm">다른 키워드로 검색해보세요</p>
  </div>
);

export default function SearchResults({
  results,
  loading,
  error,
  onSelectRestaurant,
}: SearchResultsProps) {
  console.log("검색 결과:", results);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (results.length === 0) return <EmptyResults query="" />;

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
              {restaurant.distance && (
                <p className="text-xs text-blue-600 mt-1 font-medium">
                  거리: {Math.round(Number(restaurant.distance))}m
                </p>
              )}
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
