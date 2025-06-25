"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import BasicInfoSection from "@/app/features/baropot/components/create/BasicInfoSection";
import ScheduleSection from "@/app/features/baropot/components/create/ScheduleSection";
import ParticipantConditionsSection from "@/app/features/baropot/components/create/ParticipantConditionsSection";
import ContactPaymentSection from "@/app/features/baropot/components/create/ContactPaymentSection";
import TagsSection from "@/app/features/baropot/components/create/TagsSection";
import DetailedInfoSection from "@/app/features/baropot/components/create/DetailedInfoSection";
import { useBaropotFormLogic } from "@/app/features/baropot/hooks/useBaropotForm";
import { BaropotFormData } from "@/app/features/baropot/types/baropot";
import { useEffect, useState } from "react";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";
import {
  ContactMethod,
  ParticipantAgeGroup,
  ParticipantGender,
  PaymentMethod,
} from "@/app/shared/types/enums";
import { mapKaKaoCategoryToServer } from "@/app/shared/lib/kakaoCategory";

export default function CreateBaropotForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(
    null
  );

  useEffect(() => {
    const getCurrentData = () => {
      try {
        const savedData = sessionStorage.getItem("selectedRestaurant");
        if (savedData) {
          const restaurant = JSON.parse(savedData);
          setRestaurantData({
            id: restaurant.kakaoId,
            name: restaurant.name,
            location: restaurant.location,
            category: mapKaKaoCategoryToServer(restaurant.category),
            phone: restaurant.phone || "",
            lat: restaurant.lat,
            lng: restaurant.lng,
            kakaoId: restaurant.kakaoId,
          });
        }
        // 사용 후 즉시 삭제
        sessionStorage.removeItem("selectedRestaurant");
      } catch (error) {
        console.error("데이터 파싱 오류:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };
    getCurrentData();
  }, [router]);

  // TODO: 서버에 보내는 형식은 이게 맞음
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BaropotFormData>({
    defaultValues: {
      restaurant: "",
      restaurantAddress: "",
      maxPeople: "4",
      contactMethod: ContactMethod.APP_CHAT,
      paymentMethod: PaymentMethod.DUTCH_PAY,
      gender: [ParticipantGender.ANY],
      ageGroup: [ParticipantAgeGroup.ANY],
      tags: [],
    },
  });

  const {
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    onSubmit,
  } = useBaropotFormLogic({ watch, setValue, router, restaurantData });

  if (loading) <p>레스토랑 데이터를 불러오는 중입니다 ...</p>;

  return (
    <div className="min-h-screen bg-[#E6EEF5] pt-16 pb-24">
      {/* 헤더 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            새 바로팟 만들기
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-6 space-y-6">
        <BasicInfoSection
          register={register}
          errors={errors}
          restaurantData={restaurantData}
        />

        <ScheduleSection register={register} errors={errors} />

        <ParticipantConditionsSection
          watchGender={watchGender}
          watchAgeGroup={watchAgeGroup}
          toggleArrayField={toggleArrayField}
        />

        <ContactPaymentSection
          control={control}
          register={register}
          errors={errors}
          watchContactMethod={watchContactMethod}
        />

        <TagsSection
          watchTags={watchTags}
          toggleArrayField={toggleArrayField}
        />

        <DetailedInfoSection register={register} />

        {/* 제출 버튼 */}
        <div className="pb-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? "생성 중..." : "바로팟 만들기"}</span>
            <span>🚀</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            * 표시는 필수 입력 항목입니다
          </p>
        </div>
      </form>
    </div>
  );
}
