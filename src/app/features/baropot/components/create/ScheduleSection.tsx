import { BaropotFormData } from "@/app/features/baropot/types/baropot";

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ScheduleSectionProps {
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
}

export default function ScheduleSection({
  register,
  errors,
}: ScheduleSectionProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        🗓️ 일정 및 인원
      </h2>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          모집 인원 <span className="text-red-500">*</span>
        </label>
        <select
          {...register("maxPeople", { required: "모집 인원을 선택해주세요" })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
        >
          <option value="2">2명 (나 + 1명)</option>
          <option value="3">3명 (나 + 2명)</option>
          <option value="4">4명 (나 + 3명)</option>
          <option value="5">5명 (나 + 4명)</option>
          <option value="6">6명 (나 + 5명)</option>
        </select>
        {errors.maxPeople && (
          <p className="text-red-500 text-xs mt-1">
            {errors.maxPeople.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            만날 날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("date", { required: "날짜를 선택해주세요" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            만날 시간 <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register("time", { required: "시간을 선택해주세요" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
          />
          {errors.time && (
            <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
