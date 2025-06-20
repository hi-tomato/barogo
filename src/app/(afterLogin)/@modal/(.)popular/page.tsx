"use client";
import FavoriteRestaurantCard from "@/app/features/popular/modal/FavoriteRestaurantCard";
import PopularModalHeader from "@/app/features/popular/modal/PopularModalHeader";
import PopularStatus from "@/app/features/popular/modal/PopularStatus";
import {
  useGetBookMarks,
  useRestaurantList,
} from "@/app/shared/hooks/queries/useRestaurant";

export default function FavoriteRestaurantsModal() {
  const { data: favorites, isPending, isError } = useGetBookMarks();

  if (isPending) return <PopularStatus type="loading" />;
  if (isError) return <PopularStatus type="error" />;
  if (favorites?.length === 0) return <PopularStatus type="notFound" />;
  return (
    <div className="fixed inset-0 bg-[#0000005d] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <PopularModalHeader />
        {/* 리스트 */}
        <div className="overflow-y-auto max-h-[60vh]">
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
