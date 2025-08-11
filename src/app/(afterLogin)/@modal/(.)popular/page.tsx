'use client';
import FavoriteRestaurantCard from '@/app/features/popular/modal/FavoriteRestaurantCard';
import PopularModalHeader from '@/app/features/popular/modal/PopularModalHeader';
import PopularStatus from '@/app/features/popular/modal/PopularStatus';
import { useGetBookMarks } from '@/app/shared/hooks/queries/useRestaurant';

export default function FavoriteRestaurantsModal() {
  const { data: favorites, isPending, isError } = useGetBookMarks();

  if (isPending) return <PopularStatus type="loading" />;
  if (isError) return <PopularStatus type="error" />;
  if (favorites?.length === 0) return <PopularStatus type="notFound" />;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000005d] p-4">
      <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* 헤더 */}
        <PopularModalHeader />
        {/* 리스트 */}
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {favorites?.map((restaurant, index: number) => (
              <FavoriteRestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
