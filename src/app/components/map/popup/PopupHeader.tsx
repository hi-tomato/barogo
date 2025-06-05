import { Restaurant } from "@/app/types/map";
import React from "react";

export default function PopupHeader({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <div className="font-bold text-base text-gray-800 mb-1">
          {restaurant.name}
        </div>
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
          {restaurant.category}
        </span>
      </div>
    </div>
  );
}
