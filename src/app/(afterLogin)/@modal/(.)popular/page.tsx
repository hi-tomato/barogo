"use client";
import { useFavoriteRestaurants } from "@/app/hooks/queries/useMockRestaurant";
import PopularModalHeader from "@/app/components/popular/modal/PopularModalHeader";
import PopularStatus from "@/app/components/popular/modal/PopularStatus";
import FavoriteRestaurantCard from "@/app/components/popular/modal/FavoriteRestaurantCard";
import { FavoriteRestaurant } from "@/app/types";

export default function FavoriteRestaurantsModal() {
  const { data: favorites, isLoading, isError } = useFavoriteRestaurants();

  return (
    <div className="fixed inset-0 bg-[#0000005d] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <PopularModalHeader />
        {/* 리스트 */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <PopularStatus type="loading" />
          ) : isError ? (
            <PopularStatus type="error" />
          ) : favorites?.length === 0 ? (
            <PopularStatus type="notFound" />
          ) : (
            <div className="divide-y divide-gray-100">
              {favorites?.map(
                (restaurant: FavoriteRestaurant, index: number) => (
                  <FavoriteRestaurantCard
                    restaurant={restaurant}
                    key={restaurant.id}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
