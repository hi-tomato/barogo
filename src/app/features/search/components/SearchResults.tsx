import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/hooks/useCategory";
import { NearbyRestaurant } from "@/app/types";
import React from "react";

interface SearchResultsProps {
  results: NearbyRestaurant[];
  loading: boolean;
  error: string | null;
  onSelectRestaurant: (restaurant: NearbyRestaurant) => void;
}

const Loading = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-500">검색 중...</p>
    </div>
  );
};

const Error = ({ error }: { error: string }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
      <p className="text-red-600 text-sm">{error}</p>
    </div>
  );
};

export default function SearchResults({
  results,
  loading,
  error,
  onSelectRestaurant,
}: SearchResultsProps) {
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (results.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900">
        검색 결과 ({results.length}개)
      </h3>
      {results.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => onSelectRestaurant(restaurant)}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                restaurant.category_name
              )} rounded-lg flex items-center justify-center`}
            >
              <span className="text-white text-lg">
                {getCategoryIcon(restaurant.category_name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {restaurant.place_name}
              </h4>
              <p className="text-sm text-gray-600 truncate">
                {restaurant.category_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {restaurant.address_name}
              </p>
              {restaurant.distance && (
                <p className="text-xs text-blue-600 mt-1">
                  📍 {Math.round(Number(restaurant.distance))}m
                </p>
              )}
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </div>
      ))}
    </div>
  );
}
