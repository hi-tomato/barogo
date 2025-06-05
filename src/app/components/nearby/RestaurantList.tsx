import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/hooks/useCategory";
import { NearbyRestaurant } from "@/app/types";
import Button from "../ui/Button";

interface RestaurantListProps {
  restaurants: NearbyRestaurant[];
  onCreateBaropot: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantList({
  restaurants,
  onCreateBaropot,
}: RestaurantListProps) {
  if (restaurants.length === 0) return null;

  return (
    <div className="space-y-3">
      {restaurants.map((restaurant, index) => (
        <div
          key={restaurant.id || index}
          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-3">
            {/* 카테고리 아이콘 */}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                restaurant.category_name
              )} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-white text-lg">
                {getCategoryIcon(restaurant.category_name)}
              </span>
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {restaurant.place_name}
              </h3>
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
              {restaurant.phone && (
                <p className="text-xs text-gray-500">📞 {restaurant.phone}</p>
              )}
            </div>

            <Button
              text="⚡ 바로팟 만들기"
              onClick={() => onCreateBaropot(restaurant)}
              className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-xs font-medium hover:shadow-md transition-all cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
