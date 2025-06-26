"use client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useBaropotFormLogic } from "@/app/features/baropot/hooks/useBaropotForm";
import { BaropotFormData } from "@/app/features/baropot/types/baropot";
import { useRestaurantDetail } from "@/app/shared/hooks/queries/useRestaurant";
import BasicInfoSection from "@/app/features/baropot/components/create/BasicInfoSection";
import ScheduleSection from "@/app/features/baropot/components/create/ScheduleSection";
import ParticipantConditionsSection from "@/app/features/baropot/components/create/ParticipantConditionsSection";
import ContactPaymentSection from "@/app/features/baropot/components/create/ContactPaymentSection";
import DetailedInfoSection from "@/app/features/baropot/components/create/DetailedInfoSection";
import TagsSection from "@/app/features/baropot/components/create/TagsSection";
import { RestaurantData } from "@/app/features/nearby/types/restaurant";

export default function CreateRestaurantBaropotPage() {
  const params = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const restaurantId = params.restaurantId;

  // 레스토랑 정보 API 호출
  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: restaurantError,
  } = useRestaurantDetail(restaurantId);

  // 폼 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<BaropotFormData>({
    defaultValues: {
      gender: [],
      ageGroup: [],
      tags: [],
      contactMethod: "APP_CHAT",
    },
  });

  // API에서 받은 레스토랑 데이터를 컴포넌트에서 사용할 형태로 변환
  const restaurantData: RestaurantData | null = restaurant
    ? {
        id: restaurant.id.toString(),
        name: restaurant.name,
        location: restaurant.address,
        category: restaurant.category,
        phone: restaurant.phoneNumber,
        lat: restaurant.lat.toString(),
        lng: restaurant.lng.toString(),
      }
    : null;

  const {
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    onSubmit,
    isSubmitting,
  } = useBaropotFormLogic({
    watch,
    setValue,
    router,
    restaurantData,
  });

  // 로딩 상태 처리
  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] pt-16 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C4E80]"></div>
          <p className="text-[#1C4E80]">맛집 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (restaurantError || !restaurant) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] pt-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-lg">
            맛집 정보를 불러올 수 없습니다.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

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
            바로팟 만들기
          </h1>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="p-2 text-[#1C4E80] hover:bg-blue-50 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "생성중..." : "완료"}
          </button>
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
          register={register}
          errors={errors}
          watchGender={watchGender || []}
          watchAgeGroup={watchAgeGroup || []}
          setValue={setValue}
          toggleArrayField={toggleArrayField}
        />

        <ContactPaymentSection
          register={register}
          errors={errors}
          control={control}
          watchContactMethod={watchContactMethod}
          setValue={setValue}
        />

        <DetailedInfoSection register={register} />

        <TagsSection
          watchTags={watchTags || []}
          toggleArrayField={toggleArrayField}
        />
      </form>
    </div>
  );
}
