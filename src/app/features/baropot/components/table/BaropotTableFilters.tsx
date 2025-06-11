import Button from "@/app/shared/ui/Button";

type FilterType = "all" | "recruiting" | "full" | "closed";
type SortType = "latest" | "deadline" | "popular" | "distance";

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
    <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
      {/* SearchBar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="바로팟 제목이나 맛집명으로 검색해보세요!"
          className="w-full px-4 py-3 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="absolute right-3 top-3 text-grey-400">🔍</label>
      </div>
      {/* FilteredList */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {Filters.map((options) => (
              <Button
                text={options.label}
                key={options.id}
                onClick={() => onFilterChange(options.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === options.id
                    ? `${options.color} text-white`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

const Filters = [
  { id: "all", label: "전체", color: "bg-gray-500" },
  { id: "recruiting", label: "모집중", color: "bg-blue-500" },
  { id: "full", label: "모집완료", color: "bg-orange-500" },
  { id: "closed", label: "종료", color: "bg-gray-400" },
] as const;

const sorts = [
  { id: "latest", label: "최신순" },
  { id: "deadline", label: "마감임박순" },
  { id: "popular", label: "인기순" },
  // ...(hideDistanceSort ? [] : [{ id: "distance", label: "거리순" }]),
] as const;
