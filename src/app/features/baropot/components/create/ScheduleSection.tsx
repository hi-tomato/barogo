import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/app/shared/ui';

interface ScheduleSectionProps {
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
}

export default function ScheduleSection({
  register,
  errors,
}: ScheduleSectionProps) {
  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
        🗓️ 일정 및 인원
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
          모집 인원 <span className="text-red-500">*</span>
        </label>
        <select
          {...register('maxPeople', { required: '모집 인원을 선택해주세요' })}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-[#1C4E80] focus:outline-none"
        >
          <option value="2">2명 (나 + 1명)</option>
          <option value="3">3명 (나 + 2명)</option>
          <option value="4">4명 (나 + 3명)</option>
          <option value="5">5명 (나 + 4명)</option>
          <option value="6">6명 (나 + 5명)</option>
        </select>
        {errors.maxPeople && (
          <p className="mt-1 text-xs text-red-500">
            {errors.maxPeople.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          type="date"
          {...register('date', { required: '날짜를 선택해주세요' })}
          label="만날 날짜"
          error={errors.date?.message}
          required
        />
        <Input
          type="time"
          {...register('time', { required: '시간을 선택해주세요' })}
          label="만날 시간"
          error={errors.time?.message}
          required
        />
      </div>
    </div>
  );
}
