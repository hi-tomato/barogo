import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { BaropotFormData } from '../../types/baropot';

interface ParticipantConditionsSectionProps {
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
  watchGender: string[];
  watchAgeGroup: string[];
  setValue: UseFormSetValue<BaropotFormData>;
  toggleArrayField: (
    field: 'gender' | 'ageGroup' | 'tags',
    value: string
  ) => void;
}

export default function ParticipantConditionsSection({
  watchGender,
  watchAgeGroup,
  toggleArrayField,
}: ParticipantConditionsSectionProps) {
  const Genders = ['남자', '여자', '무관'] as const;
  const Ages = ['20대', '30대', '40대', '무관'] as const;
  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
        👥 참가자 조건
      </h2>

      <div>
        <h3 className="mb-3 text-sm font-medium text-[#2B2B2B]">성별</h3>
        <div className="flex gap-3">
          {Genders.map((gender) => (
            <label
              key={gender}
              className="flex cursor-pointer items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={watchGender.includes(gender)}
                onChange={() => toggleArrayField('gender', gender)}
                className="h-4 w-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
              />
              <span className="text-sm text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-[#2B2B2B]">나이대</h3>
        <div className="flex flex-wrap gap-3">
          {Ages.map((age) => (
            <label
              key={age}
              className="flex cursor-pointer items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={watchAgeGroup.includes(age)}
                onChange={() => toggleArrayField('ageGroup', age)}
                className="h-4 w-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
              />
              <span className="text-sm text-gray-700">{age}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
