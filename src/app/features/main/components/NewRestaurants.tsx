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
    <div className="mb-6">
      <h2 className="mb-4 flex items-center text-lg font-semibold text-[#2B2B2B]">
        새로 등록된 맛집
      </h2>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {isLoading
          ? // 로딩 상태
            Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200"></div>
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
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg">
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
                        <h3 className="mb-1 line-clamp-1 font-medium text-[#2B2B2B]">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-[#8A8A8A]">
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
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-gray-400">🏪</span>
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
