'use client';
import { useParams } from 'next/navigation';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useBaropotCreateForm } from '@/app/shared/hooks/form/useBaropotCreateForm';
import { StateDisplay } from '@/app/shared/ui';
import BaropotCreateHeader from './BaropotCreateHeader';
import BaropotCreateForm from './BaropotCreateForm';

export default function BaropotCreateContainer() {
  const params = useParams<{ restaurantId: string }>();
  const restaurantId = Number(params.restaurantId);

  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: restaurantError,
  } = useRestaurantDetail(restaurantId);

  const restaurantData = restaurant
    ? {
        id: restaurant.id,
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
    setValue,
    control,
    errors,
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
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
      <BaropotCreateHeader isCreating={isCreating} onSubmit={handleSubmit} />
      <BaropotCreateForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        control={control}
        errors={errors}
        watchContactMethod={watchContactMethod}
        watchGender={watchGender}
        watchAgeGroup={watchAgeGroup}
        watchTags={watchTags}
        toggleArrayField={toggleArrayField}
        restaurantData={restaurantData}
      />
    </div>
  );
}
