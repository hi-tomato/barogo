'use client';
import { useCallback, useMemo, useState } from 'react';
import MapHeaderBar from './MapHeaderBar';

import { useFilteredRestaurants } from '@/app/features/map/hooks/useFilteredRestaurants';
import { Restaurant } from '@/app/shared/types/restaurant';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { useGetBaropotList } from '@/app/shared/hooks/queries/useBaropot';
import { BaropotStatus } from '@/app/shared/types/enums';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/app/shared/ui';

const KakaoMapView = dynamic(() => import('./KakaoMapView'), {
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <LoadingSpinner size="lg" />
    </div>
  ),
  ssr: false,
});

export default function KaKaoContainer() {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('전체');

  // 실제 레스토랑 정보를 API에서 가져옴
  const { data: restaurants = [] } = useRestaurantList();
  const { data: baropotList = [] } = useGetBaropotList();

  const baropotByRestaurantId = useMemo(() => {
    const map = new Map<number, number>();
    baropotList.forEach((baropot) => {
      if (baropot.restaurant?.id && baropot.status === BaropotStatus.OPEN) {
        const restaurantId = baropot.restaurant.id;
        const currentCount = map.get(restaurantId) || 0;
        map.set(restaurantId, currentCount + 1);
      }
    });

    return map;
  }, [baropotList]);

  const restaurantsWithBaropot = useMemo(() => {
    return restaurants.map((restaurant) => {
      const baropotCount = baropotByRestaurantId.get(restaurant.id) || 0;

      return {
        ...restaurant,
        hasBaropot: baropotCount > 0,
        baropotLength: baropotCount,
      };
    });
  }, [restaurants, baropotByRestaurantId]);

  const totalBaropotCount = useMemo(() => {
    return baropotList.filter(
      (baropot) => baropot.status === BaropotStatus.OPEN
    ).length;
  }, [baropotList]);

  const filteredRestaurants = useFilteredRestaurants(
    restaurantsWithBaropot,
    categoryFilter
  );

  const handleClosePopup = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <MapHeaderBar
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        resultCount={filteredRestaurants.length}
        baropotCount={totalBaropotCount}
      />
      <KakaoMapView
        restaurants={filteredRestaurants}
        selectedRestaurant={selected}
        onRestaurantSelect={setSelected}
        onClosePopup={handleClosePopup}
      />
    </div>
  );
}
