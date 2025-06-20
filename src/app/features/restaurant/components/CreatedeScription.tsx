import { FormData } from "../types";

interface CreateDescriptionProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function CreatedeScription({
  formData,
  handleInputChange,
}: CreateDescriptionProps) {
  return (
    <>
      {/* 맛집 설명 입력 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-medium text-[#2B2B2B] mb-3">
          맛집 설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="이 맛집의 특징, 분위기, 추천 메뉴 등을 설명해주세요!"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent resize-none"
        />
        <p className="text-xs text-[#8A8A8A] mt-2">
          💡 다른 사용자들이 이 맛집을 선택할 때 도움이 되는 정보를 적어주세요
        </p>
      </div>

      {/* 영업시간 입력 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-[#2B2B2B] mb-4 border-b border-gray-100 pb-2">
          🕐 영업시간
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              오픈 시간 <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              마감 시간 <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              라스트 오더 <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="lastOrderTime"
              value={formData.lastOrderTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
}
