import { FormData } from '../types';
import { RestaurantCategory } from '@/app/shared/types/enums';
import { getCategoryDisplayName } from '@/app/shared/lib/kakaoCategory';
import { Input } from '@/app/shared/ui';

interface CreateDescriptionProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function CreatedeScription({
  formData,
  handleInputChange,
}: CreateDescriptionProps) {
  return (
    <>
      {/* 맛집 설명 입력 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <label className="mb-3 block text-sm font-medium text-[#2B2B2B]">
          맛집 설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="이 맛집의 특징, 분위기, 추천 메뉴 등을 설명해주세요!"
          rows={5}
          required
          className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 placeholder:text-[#8A8A8A] focus:border-transparent focus:ring-2 focus:ring-[#1C4E80] focus:outline-none"
        />
        <p className="mt-2 text-xs text-[#8A8A8A]">
          💡 다른 사용자들이 이 맛집을 선택할 때 도움이 되는 정보를 적어주세요
        </p>
      </div>

      {/* 영업시간 입력 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
          🕐 영업시간
        </h3>
        <div className="space-y-4">
          <Input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleInputChange}
            required
            label="오픈 시간 *"
          />
          <Input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleInputChange}
            required
            label="마감 시간 *"
          />
          <Input
            type="time"
            name="lastOrderTime"
            value={formData.lastOrderTime}
            onChange={handleInputChange}
            required
            label="라스트 오더 *"
          />
        </div>
      </div>
      {/* 카테고리 입력 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
          🍽️ 카테고리
        </h3>
        <div className="space-y-4">
          <div>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#1C4E80] focus:outline-none"
            >
              <option value="">카테고리를 선택해주세요</option>
              {Object.values(RestaurantCategory).map((category) => (
                <option key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
