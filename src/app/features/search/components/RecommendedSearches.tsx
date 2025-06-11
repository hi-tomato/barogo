interface RecommendedSearchesProps {
  onSearchClick: (searchTerm: string) => void;
}

const recentSearches = [
  { icon: "🍷", text: "콜키지 프리", color: "bg-blue-100" },
  { icon: "📈", text: "검색 급상승 랭킹", color: "bg-orange-100" },
  { icon: "🚗", text: "무료 주차", color: "bg-blue-100" },
];

export default function RecommendedSearches({
  onSearchClick,
}: RecommendedSearchesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">추천 검색어</h2>
        <button className="text-sm text-gray-500">자세히 →</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {recentSearches.map((item, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(item.text)}
            className={`${item.color} rounded-xl p-4 text-left transition-transform active:scale-95 hover:shadow-md`}
          >
            <div className="text-xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium text-gray-800 leading-tight">
              {item.text}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
