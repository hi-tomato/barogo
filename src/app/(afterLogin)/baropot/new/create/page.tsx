"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import RestaurantSelector from "@/app/features/baropot/components/create/RestaurantSelector";
import BasicInfoSection from "@/app/features/baropot/components/create/BasicInfoSection";
import ScheduleSection from "@/app/features/baropot/components/create/ScheduleSection";
import ParticipantConditionsSection from "@/app/features/baropot/components/create/ParticipantConditionsSection";
import ContactPaymentSection from "@/app/features/baropot/components/create/ContactPaymentSection";
import TagsSection from "@/app/features/baropot/components/create/TagsSection";
import DetailedInfoSection from "@/app/features/baropot/components/create/DetailedInfoSection";
import { useBaropotFormLogic } from "@/app/features/baropot/hooks/useBaropotForm";
import { BaropotFormData } from "@/app/features/baropot/types/baropot";
import { RestaurantData } from "@/app/types/restaurant";

export default function CreateBaropotPage() {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantData | null>(null);

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
      maxPeople: "2",
      contactMethod: "app",
      paymentMethod: "dutch",
      gender: [],
      ageGroup: [],
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
  } = useBaropotFormLogic({ watch, setValue, router });

  const handleRestaurantSelect = (restaurant: RestaurantData | null) => {
    setSelectedRestaurant(restaurant);
    if (restaurant) {
      setValue("restaurant", restaurant.name);
      setValue("restaurantAddress", restaurant.location);
    } else {
      setValue("restaurant", "");
      setValue("restaurantAddress", "");
    }
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
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

      <div className="px-4 py-6 space-y-6">
        {/* Step 1: 맛집 선택 */}
        <RestaurantSelector
          selectedRestaurant={selectedRestaurant}
          onRestaurantSelect={handleRestaurantSelect}
        />

        {/* Step 2: 맛집이 선택되면 바로팟 생성 폼 표시 */}
        {selectedRestaurant && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoSection
              register={register}
              errors={errors}
              restaurantData={selectedRestaurant}
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
        )}

        {/* 맛집이 선택되지 않았을 때 안내 */}
        {!selectedRestaurant && (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">🍽️</span>
            <p className="text-gray-600 mb-2">먼저 맛집을 선택해주세요</p>
            <p className="text-sm text-gray-500">
              위 옵션 중 하나를 선택해서 바로팟을 만들 맛집을 골라주세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
