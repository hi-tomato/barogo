interface MapHeaderBarProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  resultCount: number;
}

export default function MapHeaderBar({
  categoryFilter,
  onCategoryChange,
  resultCount,
}: MapHeaderBarProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center p-3">
          <div className="border-t border-gray-100 p-3">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                카테고리
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      categoryFilter === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              📍 {resultCount}개 맛집 표시 중
              <span className="ml-2">🔥 {resultCount}개 바로팟 진행중</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "카페",
  "술집",
] as const;
