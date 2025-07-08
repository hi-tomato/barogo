'use client';
import { useParams, useRouter } from 'next/navigation';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useBaropotCreateForm } from '@/app/shared/hooks/form/useBaropotCreateForm';
import BasicInfoSection from '@/app/features/baropot/components/create/BasicInfoSection';
import ScheduleSection from '@/app/features/baropot/components/create/ScheduleSection';
import ParticipantConditionsSection from '@/app/features/baropot/components/create/ParticipantConditionsSection';
import ContactPaymentSection from '@/app/features/baropot/components/create/ContactPaymentSection';
import DetailedInfoSection from '@/app/features/baropot/components/create/DetailedInfoSection';
import TagsSection from '@/app/features/baropot/components/create/TagsSection';
import { Button, StateDisplay } from '@/app/shared/ui';

export default function CreateRestaurantBaropotPage() {
  const params = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const restaurantId = params.restaurantId;

  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: restaurantError,
  } = useRestaurantDetail(restaurantId);

  const restaurantData = restaurant
    ? {
        id: restaurant.id.toString(),
        name: restaurant.name,
        location: restaurant.address,
        category: restaurant.category,
        phone: restaurant.phoneNumber,
        lat: restaurant.lat,
        lng: restaurant.lng,
      }
    : null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    errors,
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    validateRules,
    isCreating,
  } = useBaropotCreateForm(restaurantData);

  if (restaurantLoading) {
    return <StateDisplay state="loading" size="md" />;
  }

  if (restaurantError || !restaurant) {
    return <StateDisplay state="error" size="md" />;
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5] pt-16 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex items-center px-4 py-3">
          <Button
            text="←"
            onClick={() => router.back()}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          />
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟 만들기
          </h1>
          <Button
            text={isCreating ? '생성중...' : '완료'}
            onClick={handleSubmit}
            disabled={isCreating}
            className="rounded-lg p-2 text-[#1C4E80] hover:bg-blue-50 disabled:opacity-50"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-6">
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
