'use client';
import { RestaurantCategory } from '@/app/shared/types/enums';
import Link from 'next/link';

const categories = [
  {
    id: RestaurantCategory.KOREAN,
    name: '한식',
    icon: '🍚',
    color: 'bg-red-50 border-red-200',
  },
  {
    id: RestaurantCategory.CHINESE,
    name: '중식',
    icon: '🥢',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    id: RestaurantCategory.JAPANESE,
    name: '일식',
    icon: '🍣',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: RestaurantCategory.WESTERN,
    name: '양식',
    icon: '🍝',
    color: 'bg-purple-50 border-purple-200',
  },
];

export default function CategoryExplorer() {
  return (
    <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-4">
      <h2 className="mb-3 flex items-center text-base font-semibold text-[#2B2B2B] sm:mb-4 sm:text-lg md:text-xl lg:text-lg">
        카테고리별 탐색
      </h2>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.id}&query=${encodeURIComponent(category.name)}`}
            className="block"
          >
            <div
              className={`h-20 rounded-xl p-2 text-center shadow-sm transition-all duration-200 hover:shadow-md sm:h-24 sm:p-3 md:h-28 md:p-4 lg:h-20 lg:p-2 ${category.color}`}
            >
              <div className="mb-1 text-lg sm:mb-2 sm:text-xl md:text-2xl lg:text-lg">
                {category.icon}
              </div>
              <div className="text-xs font-medium text-[#2B2B2B] sm:text-sm md:text-base lg:text-xs">
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
