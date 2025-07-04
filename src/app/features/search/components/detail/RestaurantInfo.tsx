"use client";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import RestaurantInfoHeader from "./RestaurantInfoHeader";
import RestaurantActions from "./RestaurantActions";
import RestaurantDetails from "./RestaurantDetails";

interface RestaurantInfoProps {
  restaurant: RestaurantDetail;
  isBookmarked?: boolean;
  isOwner?: boolean;
}

export default function RestaurantInfo({
  restaurant,
  isBookmarked,
  isOwner,
}: RestaurantInfoProps) {
  return (
    <div className="bg-white rounded-t-3xl shadow-lg">
      <RestaurantInfoHeader restaurant={restaurant} />
      <RestaurantActions
        restaurant={restaurant}
        isBookmarked={isBookmarked}
        isOwner={isOwner}
      />
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
}
