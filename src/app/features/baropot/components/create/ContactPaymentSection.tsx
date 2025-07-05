import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { Input } from '@/app/shared/ui';

interface ContactPaymentSectionProps {
  control: Control<BaropotFormData>;
  register: UseFormRegister<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
  watchContactMethod: string;
  setValue: UseFormSetValue<BaropotFormData>;
}

export default function ContactPaymentSection({
  control,
  register,
  errors,
  watchContactMethod,
  setValue,
}: ContactPaymentSectionProps) {
  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      <h2 className="border-b border-gray-100 pb-2 font-semibold text-[#2B2B2B]">
        💬 연락 및 비용
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
          연락 방법 <span className="text-red-500">*</span>
        </label>
        <Controller
          name="contactMethod"
          control={control}
          rules={{ required: '연락 방법을 선택해주세요' }}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'app', label: '앱 내 채팅', icon: '💬' },
                { value: 'kakao', label: '카카오톡', icon: '🟡' },
                { value: 'phone', label: '전화번호', icon: '📞' },
              ].map((method) => (
                <label key={method.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={method.value}
                    checked={field.value === method.value}
                    onChange={() => field.onChange(method.value)}
                    className="sr-only"
                  />
                  <div
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      field.value === method.value
                        ? 'border-[#1C4E80] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg">{method.icon}</div>
                    <div className="text-xs font-medium">{method.label}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.contactMethod && (
          <p className="mt-1 text-xs text-red-500">
            {errors.contactMethod.message}
          </p>
        )}
      </div>

      {watchContactMethod !== 'app' && (
        <Input
          {...register('contactInfo', {
            required:
              watchContactMethod !== 'app'
                ? '연락처 정보를 입력해주세요'
                : false,
          })}
          label={watchContactMethod === 'kakao' ? '카카오톡 ID' : '전화번호'}
          placeholder={
            watchContactMethod === 'kakao' ? 'kakao_id123' : '010-1234-5678'
          }
          error={errors.contactInfo?.message}
          required
        />
      )}

      <Input
        {...register('expectedCost')}
        label="예상 비용 (1인당)"
        placeholder="EX: 2-3만원, 15,000원"
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
          결제 방식
        </label>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'dutch', label: '더치페이', icon: '💰' },
                { value: 'host', label: '호스트가', icon: '🎁' },
                { value: 'discuss', label: '현장에서 상의', icon: '🤝' },
              ].map((method) => (
                <label key={method.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={method.value}
                    checked={field.value === method.value}
                    onChange={() => field.onChange(method.value)}
                    className="sr-only"
                  />
                  <div
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      field.value === method.value
                        ? 'border-[#1C4E80] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg">{method.icon}</div>
                    <div className="text-xs font-medium">{method.label}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
