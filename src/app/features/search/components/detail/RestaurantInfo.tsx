'use client';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import RestaurantInfoHeader from './RestaurantInfoHeader';
import RestaurantActions from './RestaurantActions';
import RestaurantDetails from './RestaurantDetails';

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
    <div className="rounded-t-3xl bg-white shadow-lg">
      <div className="flex justify-between">
        <RestaurantInfoHeader restaurant={restaurant} />
        <RestaurantActions
          restaurant={restaurant}
          isBookmarked={isBookmarked}
          isOwner={isOwner}
        />
      </div>
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
}
