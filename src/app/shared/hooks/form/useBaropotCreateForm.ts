import { RestaurantData } from '@/app/features/restaurant/types';
import { useFormBase } from './useFormBase';
import { useParams, useRouter } from 'next/navigation';
import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { useCreateBaropot } from '@/app/shared/hooks/queries/useBaropot';

export const useBaropotCreateForm = (restaurantData: RestaurantData) => {
  const router = useRouter();
  const params = useParams();
  const {
    mutate: createBaropot,
    isPending: isCreating,
    error: createError,
  } = useCreateBaropot();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormBase<BaropotFormData>({
    defaultValues: {
      gender: [],
      ageGroup: [],
      tags: [],
      contactMethod: 'APP_CHAT',
    },

    mode: 'onChange',

    onSubmit: (data) => {
      const restaurantId = (() => {
        if (params.restaurantId) {
          const id = Number(params.restaurantId);
          return id;
        }

        const storedData = sessionStorage.getItem('selectedRestaurant');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.restaurantId) {
            const id = Number(parsedData.restaurantId);
            return id;
          }
        }
        return null;
      })();

      return restaurantId;
    },
  });
};
