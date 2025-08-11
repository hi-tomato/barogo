import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { StateDisplay } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import PopularRestaurantCard from './PopularRestaurantCard';

export default function PopularTab() {
  const router = useRouter();
  const { data: restaurantList = [], isLoading } = useRestaurantList();

  const popularRestaurants = useMemo(() => {
    if (!restaurantList.length) {
      return [];
    }

    const uniqueMap = new Map();
    restaurantList.forEach((restaurant) => {
      if (!uniqueMap.has(restaurant.name)) {
        uniqueMap.set(restaurant.name, restaurant);
      }
    });

    return Array.from(uniqueMap.values())
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 10);
  }, [restaurantList]);

  const handleDetailClick = useCallback(
    (restaurantId: number) => {
      router.push(`/restaurants/${restaurantId}`);
    },
    [router]
  );

  if (isLoading) return <StateDisplay state="loading" size="lg" />;

  return (
    <div className="space-y-4">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#2B2B2B]">
        🔥 인기 맛집 TOP {popularRestaurants.length}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {popularRestaurants.map((item, index) => (
          <PopularRestaurantCard
            key={item.id}
            item={item}
            index={index}
            onDetailClick={handleDetailClick}
          />
        ))}
      </div>
    </div>
  );
}
