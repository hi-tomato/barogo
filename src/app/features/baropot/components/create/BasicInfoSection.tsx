import { BaropotFormData } from "@/app/features/baropot/types/baropot";

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface BasicInfoSectionProps {
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
  restaurantData?: any;
}

export default function BasicInfoSection({
  register,
  errors,
  restaurantData,
}: BasicInfoSectionProps) {
  return (
    <>
      {restaurantData && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-orange-600">🎯</span>
            <h3 className="font-semibold text-orange-800">
              {restaurantData.name}
            </h3>
          </div>
          <p className="font-medium text-gray-900">{restaurantData.name}</p>
          <p className="text-sm text-gray-600">{restaurantData.location}</p>
          <p className="text-xs text-gray-500">{restaurantData.category}</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
          📝 기본 정보
        </h2>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            바로팟 모집 제목 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", {
              required: "바로팟 제목을 입력해주세요",
              minLength: {
                value: 2,
                message: "제목은 2글자 이상 입력해주세요",
              },
            })}
            placeholder="EX: 이경문 순대곱창 같이 가쉴?"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            만날 장소 (상세) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("meetingLocation", {
              required: "만날 장소를 입력해주세요",
            })}
            placeholder="EX: 홍대입구역 2번 출구, 스타벅스 앞"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
          />
          {errors.meetingLocation && (
            <p className="text-red-500 text-xs mt-1">
              {errors.meetingLocation.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            정확한 만날 장소를 알려주세요
          </p>
        </div>
      </div>
    </>
  );
}
