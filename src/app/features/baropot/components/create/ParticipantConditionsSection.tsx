import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { BaropotFormData } from "../../types/baropot";

interface ParticipantConditionsSectionProps {
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
  watchGender: string[];
  watchAgeGroup: string[];
  setValue: UseFormSetValue<BaropotFormData>;
  toggleArrayField: (
    field: "gender" | "ageGroup" | "tags",
    value: string
  ) => void;
}

export default function ParticipantConditionsSection({
  register,
  errors,
  watchGender,
  watchAgeGroup,
  setValue,
  toggleArrayField,
}: ParticipantConditionsSectionProps) {
  const Genders = ["남자", "여자", "무관"] as const;
  const Ages = ["20대", "30대", "40대", "무관"] as const;
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        👥 참가자 조건
      </h2>

      <div>
        <h3 className="text-sm font-medium text-[#2B2B2B] mb-3">성별</h3>
        <div className="flex gap-3">
          {Genders.map((gender) => (
            <label
              key={gender}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={watchGender.includes(gender)}
                onChange={() => toggleArrayField("gender", gender)}
                className="w-4 h-4 text-[#1C4E80] border-gray-300 rounded focus:ring-[#1C4E80]"
              />
              <span className="text-sm text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#2B2B2B] mb-3">나이대</h3>
        <div className="flex gap-3 flex-wrap">
          {Ages.map((age) => (
            <label
              key={age}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={watchAgeGroup.includes(age)}
                onChange={() => toggleArrayField("ageGroup", age)}
                className="w-4 h-4 text-[#1C4E80] border-gray-300 rounded focus:ring-[#1C4E80]"
              />
              <span className="text-sm text-gray-700">{age}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
