'use client';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import Image from 'next/image';
import Link from 'next/link';
import { BiRestaurant, BiRightArrow } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

export default function NewRestaurants() {
  const { data: restaurants = [], isLoading } = useRestaurantList();

  const newRestaurants = restaurants.sort((a, b) => b.id - a.id).slice(0, 2);

  return (
    <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-4">
      <h2 className="mb-3 flex items-center text-base font-semibold text-[#2B2B2B] sm:mb-4 sm:text-lg md:text-xl lg:text-lg">
        새로 등록된 맛집
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-2 lg:gap-4">
        {isLoading
          ? // 로딩 상태
            Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4 md:p-5 lg:p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="aspect-square w-12 animate-pulse rounded-lg bg-gray-200 sm:w-14 md:w-16 lg:w-12"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="text-[#1C4E80]">
                    <BsArrowRight className="flex-shrink-0 text-[#1C4E80]" />
                  </div>
                </div>
              </div>
            ))
          : newRestaurants.length > 0
            ? newRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}
                  className="block"
                >
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4 md:p-5 lg:p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex aspect-square w-12 items-center justify-center rounded-lg sm:w-14 md:w-16 lg:w-12">
                        {restaurant.photos && restaurant.photos.length > 0 ? (
                          <Image
                            src={restaurant.photos[0]}
                            alt={restaurant.name}
                            className="h-full w-full rounded-lg object-cover"
                            width={48}
                            height={48}
                          />
                        ) : (
                          <span className="text-lg">
                            <BiRestaurant size={24} className="text-gray-400" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 line-clamp-1 text-sm font-medium text-[#2B2B2B] sm:text-base md:text-lg lg:text-sm">
                          {restaurant.name}
                        </h3>
                        <p className="text-xs text-[#8A8A8A] sm:text-sm md:text-base lg:text-xs">
                          📍{' '}
                          {restaurant.address
                            ?.split(' ')
                            .slice(0, 2)
                            .join(' ') || '주소 정보 없음'}{' '}
                          {restaurant.rating ? `• ⭐ ${restaurant.rating}` : ''}
                        </p>
                      </div>
                      <div className="text-[#1C4E80]">
                        <BsArrowRight className="flex-shrink-0 text-[#1C4E80]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : // 빈 상태
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4 md:p-5 lg:p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex aspect-square w-12 items-center justify-center rounded-lg bg-gray-100 sm:w-14 md:w-16 lg:w-12">
                      {/* <span className="text-gray-400">🏪</span> */}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 h-4 rounded bg-gray-100"></div>
                      <div className="h-3 w-2/3 rounded bg-gray-100"></div>
                    </div>
                    <div className="text-gray-300">
                      <BiRightArrow />
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
}
