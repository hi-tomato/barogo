import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/app/shared/ui';

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
        <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4">
          <div className="mb-2 flex items-center space-x-2">
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

      <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
          📝 기본 정보
        </h2>

        <Input
          {...register('title', {
            required: '바로팟 제목을 입력해주세요',
            minLength: {
              value: 2,
              message: '제목은 2글자 이상 입력해주세요',
            },
          })}
          label="바로팟 모집 제목"
          placeholder="EX: 이경문 순대곱창 같이 가쉴?"
          error={errors.title?.message}
          required
        />

        <Input
          {...register('meetingLocation', {
            required: '만날 장소를 입력해주세요',
          })}
          label="만날 장소 (상세)"
          placeholder="EX: 홍대입구역 2번 출구, 스타벅스 앞"
          error={errors.meetingLocation?.message}
          helperText="정확한 만날 장소를 알려주세요"
          required
        />
      </div>
    </>
  );
}
