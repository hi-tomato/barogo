'use client';
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  Control,
} from 'react-hook-form';
import BasicInfoSection from '@/app/features/baropot/components/create/BasicInfoSection';
import ScheduleSection from '@/app/features/baropot/components/create/ScheduleSection';
import ParticipantConditionsSection from '@/app/features/baropot/components/create/ParticipantConditionsSection';
import ContactPaymentSection from '@/app/features/baropot/components/create/ContactPaymentSection';
import DetailedInfoSection from '@/app/features/baropot/components/create/DetailedInfoSection';
import TagsSection from '@/app/features/baropot/components/create/TagsSection';
import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { RestaurantData } from '@/app/features/restaurant/types';

interface BaropotCreateFormProps {
  register: UseFormRegister<BaropotFormData>;
  handleSubmit: (e: React.FormEvent) => void;
  setValue: UseFormSetValue<BaropotFormData>;
  control: Control<BaropotFormData>;
  errors: FieldErrors<BaropotFormData>;
  watchContactMethod: string;
  watchGender: string[];
  watchAgeGroup: string[];
  watchTags: string[];
  toggleArrayField: (
    fieldName: keyof Pick<BaropotFormData, 'gender' | 'ageGroup' | 'tags'>,
    value: string
  ) => void;
  restaurantData?: RestaurantData | null;
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
