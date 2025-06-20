import { RestaurantData } from "../types";

interface CreateBasicInfoProps {
  restaurant: RestaurantData;
}
export default function CreateBasicInfo({ restaurant }: CreateBasicInfoProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-[#2B2B2B] mb-4 border-b border-gray-100 pb-2">
        🍽️ 등록할 맛집
      </h3>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🍽️</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-[#2B2B2B]">
            {restaurant.name}
          </h4>
          <p className="text-sm text-[#8A8A8A]">{restaurant.category}</p>
          <p className="text-sm text-[#8A8A8A]">📍 {restaurant.location}</p>
          {restaurant.phone && (
            <p className="text-sm text-[#8A8A8A]">📞 {restaurant.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
