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
    <div className="mb-6">
      <h2 className="mb-4 flex items-center text-lg font-semibold text-[#2B2B2B]">
        <span className="mr-2 text-xl">🏷️</span>
        카테고리별 탐색
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.id}&query=${encodeURIComponent(category.name)}`}
            className="block"
          >
            <div
              className={`rounded-xl p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md ${category.color}`}
            >
              <div className="mb-2 text-2xl">{category.icon}</div>
              <div className="text-sm font-medium text-[#2B2B2B]">
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
