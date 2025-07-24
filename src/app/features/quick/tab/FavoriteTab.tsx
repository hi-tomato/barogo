'use client';
import { useGetBookMarks } from '@/app/shared/hooks/queries/useRestaurant';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiClock, HiStar } from 'react-icons/hi';
import { HiMapPin } from 'react-icons/hi2';

export default function FavoriteTab() {
  const router = useRouter();
  const { data: favoriteRestaurants } = useGetBookMarks();

  if (!favoriteRestaurants) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold text-[#2B2B2B]">
          ⭐ 즐겨찾기 ({favoriteRestaurants.length})
        </h3>
      </div>

      <div className="space-y-3">
        {favoriteRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              {/* 맛집 이미지 */}
              <div className="flex-shrink-0">
                {restaurant.photos[0] ? (
                  <Image
                    src={restaurant.photos[0] || '/default-restaurant.jpg'}
                    alt={restaurant.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="text-center">
                      <div className="text-2xl">🍽️</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 맛집 정보 */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="truncate font-medium text-gray-900">
                    {restaurant.name}
                  </h4>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <HiStar size={14} />
                    <span className="text-xs">즐겨찾기</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="mb-2 flex items-center gap-1 text-sm text-gray-600">
                    <HiMapPin size={14} />
                    <span className="truncate">{restaurant.address}</span>
                  </div>

                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      {restaurant.category}
                    </span>
                  </div>

                  {restaurant.description && (
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {restaurant.description.length > 100
                        ? restaurant.description.slice(0, 25) + '...'
                        : restaurant.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <HiClock size={12} />
                <span>즐겨찾기 추가됨</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    router.push(`/restaurant/${restaurant.id}`);
                  }}
                  className="text-xs text-blue-600 transition-colors hover:text-blue-800"
                >
                  상세 보기
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
