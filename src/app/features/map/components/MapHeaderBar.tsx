// 'use client';
import { Input } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';

interface MapHeaderBarProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  resultCount: number;
  baropotCount: number;
}

export default function MapHeaderBar({
  categoryFilter,
  onCategoryChange,
  resultCount,
  baropotCount,
}: MapHeaderBarProps) {
  const router = useRouter();

  return (
    <div className="absolute top-4 right-4 left-4 z-10">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="p-3">
          <div className="mb-3">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              <Input
                placeholder="찾고 계신 맛집이 있나요?"
                className="my-2 w-full rounded-full border-0 bg-gray-100 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                onClick={() => router.push('/search')}
              />
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    categoryFilter === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500">
            📍 {resultCount}개 맛집 표시 중
            <span className="ml-2">🔥 {baropotCount}개 바로팟 진행중</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  '전체',
  '한식',
  '중식',
  '일식',
  '양식',
  '카페',
  '술집',
] as const;
