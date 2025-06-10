interface TagsSectionProps {
  watchTags: string[];
  toggleArrayField: (
    field: "gender" | "ageGroup" | "tags",
    value: string
  ) => void;
}
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

export default function TagsSection({
  watchTags,
  toggleArrayField,
}: TagsSectionProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        🏷️ 태그
      </h2>
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
