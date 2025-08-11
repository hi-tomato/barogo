'use client';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { LoadingSpinner } from '@/app/shared/ui';
import Link from 'next/link';
import Image from 'next/image';

export default function PopularRestaurants() {
  const { data: restaurants = [], isLoading } = useRestaurantList();

  const popularRestaurants = restaurants.slice(0, 4);

  return (
    <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-4">
      <h2 className="mb-3 flex items-center text-base font-semibold text-[#2B2B2B] sm:mb-4 sm:text-lg md:text-xl lg:text-lg">
        오늘의 인기 맛집
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-4">
        {isLoading
          ? // 로딩 상태
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4 md:p-5 lg:p-3"
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
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4 md:p-5 lg:p-3">
                    <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200 sm:mb-3 sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[8/5]">
                      {restaurant.photos && restaurant.photos.length > 0 ? (
                        <Image
                          src={restaurant.photos[0]}
                          alt={restaurant.name}
                          fill
                          sizes="(max-width: 640px) calc(50vw - 24px), (max-width: 768px) calc(50vw - 24px), (max-width: 1024px) calc(25vw - 18px), calc(25vw - 18px)"
                          className="object-cover"
                          priority={index < 2}
                          placeholder="empty"
                        />
                      ) : (
                        <span className="text-2xl">🏪</span>
                      )}
                    </div>
                    <h3 className="mb-1 line-clamp-1 text-xs font-medium text-[#2B2B2B] sm:text-sm md:text-base lg:text-sm">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-[#8A8A8A]">
                      {restaurant.rating
                        ? `• ⭐ ${restaurant.rating}`
                        : '등록된 리뷰가 없습니다.'}
                    </p>
                  </div>
                </Link>
              ))
            : // 빈 상태
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4 md:p-5 lg:p-3"
                >
                  <div className="mb-2 flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-gray-100 sm:mb-3 sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[8/5]">
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
