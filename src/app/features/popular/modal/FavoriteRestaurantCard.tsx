"use client";
import { Restaurant } from "@/app/shared/types/restaurant";
import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

interface FavoriteRestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export default function FavoriteRestaurantCard({
  restaurant,
  index,
}: FavoriteRestaurantCardProps) {
  const router = useRouter();
  const handleDetailView = () => {
    console.log("상세 페이지로 이동:", restaurant.id);
    router.push(`/search/${restaurant.id}/detail`);
  };
  return (
    <div
      key={restaurant.id}
      className="flex items-center p-4 hover:bg-gray-50 transition-colors"
    >
      {/* 순위 */}
      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm font-medium text-gray-600 mr-3">
        {index + 1}
      </div>

      {/* 이미지 */}
      <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500"></div>
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate mb-1">
          {restaurant.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{restaurant.address}</p>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="text-red-500 text-sm">👍</span>
            <span className="text-red-500 text-sm font-medium ml-1">
              댓글 {restaurant.reviewCount}개
            </span>
          </div>
        </div>
        <div className="flex items-center mt-1">
          <Button text="🔍 상세보기" onClick={handleDetailView} />
        </div>
      </div>
    </div>
  );
}
