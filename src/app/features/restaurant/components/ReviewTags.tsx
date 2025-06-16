import { FormData } from "../types";

interface ReviewTagsProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addTag: (tag: string) => void;
}

const RECOMMENDED_TAGS = [
  "#데이트코스",
  "#가성비",
  "#분위기좋은",
  "#혼밥추천",
  "#회식장소",
  "#깔끔한",
  "#인스타감성",
  "#조용한",
  "#넓은공간",
  "#주차가능",
];

export default function ReviewTags({
  formData,
  handleInputChange,
  addTag,
}: ReviewTagsProps) {
  // 현재 입력된 태그들을 배열로 변환
  const currentTags = formData.tags
    .split(" ")
    .filter((tag) => tag.trim().length > 0);

  // 태그가 이미 추가되었는지 확인
  const isTagAdded = (tag: string) => {
    return currentTags.includes(tag);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium text-[#2B2B2B] mb-3">
        분위기 태그
      </label>

      {/* 태그 입력 */}
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleInputChange}
        placeholder="#데이트코스 #가성비 #분위기좋은"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
      />
      <p className="text-xs text-[#8A8A8A] mt-2 mb-3">
        💡 #을 붙여서 태그를 입력해주세요 (공백으로 구분)
      </p>

      {/* 현재 입력된 태그들 표시 */}
      {currentTags.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[#2B2B2B] mb-2 font-medium">
            선택된 태그:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#1C4E80] text-white rounded-full text-xs flex items-center space-x-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newTags = currentTags
                      .filter((t) => t !== tag)
                      .join(" ");
                    handleInputChange({
                      target: { name: "tags", value: newTags },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
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

      {/* 추천 태그 */}
      <div>
        <p className="text-xs text-[#8A8A8A] mb-2">
          추천 태그 (클릭해서 추가):
        </p>
        <div className="flex flex-wrap gap-2">
          {RECOMMENDED_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              disabled={isTagAdded(tag)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                isTagAdded(tag)
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#E6EEF5] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white"
              }`}
              title={
                isTagAdded(tag)
                  ? "이미 추가된 태그입니다"
                  : "클릭해서 태그 추가"
              }
            >
              {tag}
              {isTagAdded(tag) && " ✓"}
            </button>
          ))}
        </div>
      </div>

      {/* 태그 입력 가이드 */}
      <div className="mt-4 text-xs text-[#8A8A8A] bg-gray-50 p-3 rounded-lg">
        <p className="mb-1">
          🏷️ <strong>태그 작성 가이드:</strong>
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>맛집의 분위기나 특징을 나타내는 키워드를 입력하세요</li>
          <li>다른 사용자들이 검색할 때 도움이 되는 태그를 선택해주세요</li>
          <li>최대 10개까지 태그를 추가할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}
