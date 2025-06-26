import { BaropotFormData } from "@/app/features/baropot/types/baropot";
import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";

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
    <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-[#2B2B2B] border-b border-gray-100 pb-2">
        💬 연락 및 비용
      </h2>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          연락 방법 <span className="text-red-500">*</span>
        </label>
        <Controller
          name="contactMethod"
          control={control}
          rules={{ required: "연락 방법을 선택해주세요" }}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "app", label: "앱 내 채팅", icon: "💬" },
                { value: "kakao", label: "카카오톡", icon: "🟡" },
                { value: "phone", label: "전화번호", icon: "📞" },
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
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      field.value === method.value
                        ? "border-[#1C4E80] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
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
          <p className="text-red-500 text-xs mt-1">
            {errors.contactMethod.message}
          </p>
        )}
      </div>

      {watchContactMethod !== "app" && (
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            {watchContactMethod === "kakao" ? "카카오톡 ID" : "전화번호"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactInfo", {
              required:
                watchContactMethod !== "app"
                  ? "연락처 정보를 입력해주세요"
                  : false,
            })}
            placeholder={
              watchContactMethod === "kakao" ? "kakao_id123" : "010-1234-5678"
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
          />
          {errors.contactInfo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contactInfo.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          예상 비용 (1인당)
        </label>
        <input
          {...register("expectedCost")}
          placeholder="EX: 2-3만원, 15,000원"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
          결제 방식
        </label>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "dutch", label: "더치페이", icon: "💰" },
                { value: "host", label: "호스트가", icon: "🎁" },
                { value: "discuss", label: "현장에서 상의", icon: "🤝" },
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
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      field.value === method.value
                        ? "border-[#1C4E80] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
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
