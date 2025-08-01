'use client';
import BasicInfoSection from '@/app/features/baropot/components/create/BasicInfoSection';
import ScheduleSection from '@/app/features/baropot/components/create/ScheduleSection';
import ParticipantConditionsSection from '@/app/features/baropot/components/create/ParticipantConditionsSection';
import ContactPaymentSection from '@/app/features/baropot/components/create/ContactPaymentSection';
import DetailedInfoSection from '@/app/features/baropot/components/create/DetailedInfoSection';
import TagsSection from '@/app/features/baropot/components/create/TagsSection';

interface BaropotCreateFormProps {
  register: any;
  handleSubmit: any;
  setValue: any;
  control: any;
  errors: any;
  watchContactMethod: any;
  watchGender: any;
  watchAgeGroup: any;
  watchTags: any;
  toggleArrayField: any;
  restaurantData?: any;
}

export default function BaropotCreateForm({
  register,
  handleSubmit,
  setValue,
  control,
  errors,
  watchContactMethod,
  watchGender,
  watchAgeGroup,
  watchTags,
  toggleArrayField,
  restaurantData,
}: BaropotCreateFormProps) {
  return (
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
  );
}
