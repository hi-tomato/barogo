import { Restaurant } from "@/app/types/map";
import React from "react";

export default function PopupContents({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-yellow-500">⭐</span>
        <span className="text-sm font-medium">{restaurant.rating}</span>
        <span className="text-gray-400 text-xs">
          ({restaurant.reviewCount}개 리뷰)
        </span>
      </div>
      {/* 설명 */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {restaurant.description}
      </p>

      {/* 바로팟 정보 */}
      {restaurant.hasBaropot && (
        <div className="mb-3 p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="text-orange-600 text-xs font-medium">
              🔥 진행중인 바로팟
            </div>
            <span className="text-orange-600 font-bold text-sm">
              {restaurant.baropotCount}개
            </span>
          </div>
          <div className="text-orange-500 text-xs mt-1">
            지금 바로팟에 참석해보세요!
          </div>
        </div>
      )}
    </>
  );
}
