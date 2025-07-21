import { Button, Input } from '@/app/shared/ui';
import {
  FilterType,
  SortType,
} from '@/app/features/baropot/types/baropotTable';

const Filters = [
  { id: FilterType.ALL, label: '전체', color: 'bg-gray-500' },
  { id: FilterType.RECRUITING, label: '모집중', color: 'bg-blue-500' },
  { id: FilterType.FULL, label: '모집완료', color: 'bg-orange-500' },
  { id: FilterType.CLOSED, label: '종료', color: 'bg-gray-400' },
] as const;

const sorts = [
  { id: SortType.LATEST, label: '최신순' },
  { id: SortType.DEADLINE, label: '마감임박순' },
  { id: SortType.POPULAR, label: '인기순' },
] as const;

interface FiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
  hideDistanceSort?: boolean;
}

export default function BaropotTableFilters({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: FiltersProps) {
  return (
    <div className="mx-4 mt-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* SearchBar */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="바로팟 제목이나 맛집명으로 검색해보세요!"
        rightIcon={<span>🔍</span>}
      />
      {/* FilteredList */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {Filters.map((options) => (
              <Button
                text={options.label}
                key={options.id}
                onClick={() => onFilterChange(options.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  filter === options.id
                    ? `${options.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Sort */}
      <div className="flex-shrink-0">
        <select
          id="sortList"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
        >
          {sorts.map((options) => (
            <option key={options.id}>{options.label}</option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-500">
        총 {filteredCount}개 바로팟 (전체 {totalCount})
      </div>
    </div>
  );
}
