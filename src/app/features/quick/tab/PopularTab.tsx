import StarRating from '@/app/shared/components/StarRating';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { StateDisplay } from '@/app/shared/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/shared/lib/cn';
import { HiMapPin } from 'react-icons/hi2';

const styleVariable = (index: number) => {
  return {
    'bg-red-100 text-red-500': index === 0,
    'bg-yellow-100 text-yellow-500': index === 1,
    'bg-green-100 text-green-500': index === 2,
    'bg-gray-100 text-gray-500': index >= 3,
  };
};

export default function PopularTab() {
  const router = useRouter();
  const { data: restaurantList = [], isLoading } = useRestaurantList();

  const uniqueRestaurants = restaurantList.filter(
    (restaurant, idx, arr) =>
      arr.findIndex((item) => item.name === restaurant.name) === idx
  );

  const popularRestaurants = uniqueRestaurants
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 10);

  if (isLoading) return <StateDisplay state="loading" size="lg" />;

  return (
    <div className="space-y-4">
      <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#2B2B2B]">
        🔥 인기 맛집 TOP {popularRestaurants.length}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {popularRestaurants.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              {/* 순위 */}
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                    styleVariable(index)
                  )}
                >
                  {index + 1}
                </div>
              </div>

              {/* 이미지 */}
              <div className="flex-shrink-0">
                {item.photos[0] ? (
                  <Image
                    src={item.photos[0]}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center">
                      <div className="mb-1 text-2xl">🖼️</div>
                      <div className="text-xs font-medium text-gray-500">
                        사진 준비중
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="truncate font-medium text-gray-900">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 text-orange-500">
                    <span className="text-xs font-medium">Popular</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* 별점 */}
                  <div className="flex items-center gap-2">
                    <StarRating rating={Number(item.rating) || 0} />
                    <span className="text-sm text-gray-600">
                      {item.reviewCount || 0}개의 리뷰
                    </span>
                  </div>

                  {/* 주소 */}
                  <p className="mb-2 flex items-center gap-1 text-sm text-gray-600">
                    <HiMapPin size={14} /> {item.address}
                  </p>

                  {/* 영업시간 */}
                  <div className="text-xs text-gray-500">
                    {item.openingTime} - {item.closingTime}
                    {item.lastOrderTime && ` (마감주문: ${item.lastOrderTime})`}
                  </div>

                  {/* 설명 */}
                  {item.description && (
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="mt-3 flex justify-end border-t border-gray-100 pt-3">
              <button
                onClick={() => router.push(`/restaurants/${item.id}`)}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
                상세보기 →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
