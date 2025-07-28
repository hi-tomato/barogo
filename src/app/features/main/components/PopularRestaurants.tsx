'use client';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { LoadingSpinner } from '@/app/shared/ui';
import Link from 'next/link';
import Image from 'next/image';

export default function PopularRestaurants() {
  const { data: restaurants = [], isLoading } = useRestaurantList();

  const popularRestaurants = restaurants.slice(0, 4);

  return (
    <div className="mb-6">
      <h2 className="mb-4 flex items-center text-lg font-semibold text-[#2B2B2B]">
        <span className="mr-2 text-xl">🍽️</span>
        오늘의 인기 맛집
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading
          ? // 로딩 상태
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <LoadingSpinner size="lg" />
              </div>
            ))
          : popularRestaurants.length > 0
            ? // 실제 데이터
              popularRestaurants.map((restaurant, index) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}
                  className="block"
                >
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
                    <div className="relative mb-3 h-24 w-full overflow-hidden rounded-lg bg-gray-200">
                      {restaurant.photos && restaurant.photos.length > 0 ? (
                        <Image
                          src={restaurant.photos[0]}
                          alt={restaurant.name}
                          fill
                          sizes="(max-width: 1024px) calc(50vw - 24px), calc(25vw - 18px)"
                          className="object-cover"
                          priority={index < 2}
                          placeholder="empty"
                        />
                      ) : (
                        <span className="text-2xl">🏪</span>
                      )}
                    </div>
                    <h3 className="mb-1 line-clamp-1 text-sm font-medium text-[#2B2B2B]">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-[#8A8A8A]">
                      ⭐ {restaurant.rating || '4.0'} (
                      {restaurant.reviewCount || 0}개 리뷰)
                    </p>
                  </div>
                </Link>
              ))
            : // 빈 상태
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-gray-100">
                    <span className="text-gray-400">🏪</span>
                  </div>
                  <div className="mb-2 h-4 rounded bg-gray-100"></div>
                  <div className="h-3 w-2/3 rounded bg-gray-100"></div>
                </div>
              ))}
      </div>
    </div>
  );
}
