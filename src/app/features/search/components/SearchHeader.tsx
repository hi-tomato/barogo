'use client';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';
import { Input, LoadingSpinner } from '@/app/shared/ui';

interface SearchHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
}

export default function SearchHeader({
  query,
  setQuery,
  loading,
}: SearchHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <button className="cursor-pointer p-1" onClick={() => router.back()}>
          <HiArrowLeft size={24} className="text-gray-700" />
        </button>
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="위스키 페어링을 검색해보세요!"
            variant="search"
            autoFocus
            rightIcon={
              loading ? (
                <LoadingSpinner size="sm" color="blue" inline />
              ) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
