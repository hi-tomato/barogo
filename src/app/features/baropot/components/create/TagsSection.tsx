interface TagsSectionProps {
  watchTags: string[];
  toggleArrayField: (
    field: "gender" | "ageGroup" | "tags",
    value: string
  ) => void;
}
// TODO: 태그가 서버에서 제공하는 이넘 형태로 변경해야할듯

export default function TagsSection({
  watchTags,
  toggleArrayField,
}: TagsSectionProps) {
  const HashTags = [
    "한식",
    "중식",
    "일식",
    "양식",
    "카페",
    "술집",
    "직장인",
    "학생",
    "데이트",
    "회식",
    "혼밥탈출",
    "새로운친구",
  ] as const;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        🏷️ 태그
      </h2>

      {/* 현재 선택된 태그들 표시 */}
      {watchTags.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[#2B2B2B] mb-2 font-medium">
            선택된 태그:
          </p>
          <div className="flex flex-wrap gap-2">
            {watchTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#1C4E80] text-white rounded-full text-xs flex items-center space-x-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => toggleArrayField("tags", tag)}
                  className="ml-1 hover:bg-red-500 rounded-full w-4 h-4 flex items-center justify-center"
                  title="태그 삭제"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {HashTags.map((tag) => (
          <label key={tag} className="cursor-pointer">
            <input
              type="checkbox"
              checked={watchTags.includes(tag)}
              onChange={() => toggleArrayField("tags", tag)}
              className="sr-only"
            />
            <div
              className={`px-3 py-2 border-2 rounded-lg text-center transition-all text-sm ${
                watchTags.includes(tag)
                  ? "border-[#1C4E80] bg-blue-50 text-[#1C4E80]"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              {tag}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
