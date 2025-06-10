import { BaropotFormData } from "@/app/features/baropot/types/baropot";
import { UseFormRegister } from "react-hook-form";

interface DetailedInfoSectionProps {
  register: UseFormRegister<BaropotFormData>;
}

export default function DetailedInfoSection({
  register,
}: DetailedInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        📝 상세 정보
      </h2>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          상세 설명
        </label>
        <textarea
          {...register("description")}
          placeholder="같이 가는 파티원들을 위한 간단한 설명을 적어주세요."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          모임 규칙 / 주의사항
        </label>
        <textarea
          {...register("rules")}
          placeholder="EX: 노쇼 금지, 시간 엄수, 술 못 드시는 분도 환영"
          rows={2}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
