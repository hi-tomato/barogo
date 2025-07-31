import { useParams, useRouter } from 'next/navigation';
import { RestaurantData } from '@/app/features/restaurant/types';
import { useFormBase } from './useFormBase';
import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { useCreateBaropot } from '@/app/shared/hooks/queries/useBaropot';
import { CreateBaropotRequest } from '@/app/shared/types/baropots';
import { ContactMethod } from '@/app/shared/types/enums';
import { BAROPOT_CREATE_FORM_VALIDATE_RULES } from '@/app/shared/lib/validate';
import {
  mapAgeToEnum,
  mapContactMethodToEnum,
  mapGenderToEnum,
  mapPaymentMethodToEnum,
} from '@/app/shared/lib/createBaropotHelper';
import { useToast } from '@/app/shared/hooks/useToast';

const defaultValues = {
  gender: [],
  ageGroup: [],
  tags: [],
  contactMethod: ContactMethod.KAKAO_TALK,
};

export const useBaropotCreateForm = (restaurantData: RestaurantData | null) => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

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
    control,
    formState: { errors },
  } = useFormBase<BaropotFormData>({
    defaultValues,
    mode: 'onChange',
    onSubmit: (data) => {
      const restaurantId = (() => {
        if (params.restaurantId) {
          return Number(params.restaurantId);
        }

        const storedData = sessionStorage.getItem('selectedRestaurant');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.restaurantId) {
            return Number(parsedData.restaurantId);
          }
        }

        return Number(restaurantData?.id) || 1;
      })();
      const submitData: CreateBaropotRequest = {
        restaurantId,
        title: data.title.trim(),
        location: data.meetingLocation.trim(),
        maxParticipants: parseInt(data.maxPeople),
        date: data.date,
        time: data.time,
        participantGender: mapGenderToEnum(data.gender),
        participantAgeGroup: mapAgeToEnum(data.ageGroup),
        contactMethod: mapContactMethodToEnum(data.contactMethod),
        paymentMethod: mapPaymentMethodToEnum(data.paymentMethod),
        estimatedCostPerPerson: data.expectedCost
          ? parseInt(data.expectedCost.replace(/[^0-9]/g, ''))
          : undefined,
        tags: ((data.tags as string[]) || []).filter(
          (tag: string) => tag.trim().length > 0
        ),
        description: data.description?.trim() || '',
        rule: data.rules?.trim(),
      };

      createBaropot(submitData, {
        onSuccess: async () => {
          toast.success('✅ 바로팟이 생성되었습니다!');
          router.push('/baropot');
        },
        onError: () => {
          toast.error('바로팟 생성에 실패했습니다. 다시 시도해주세요.');
        },
      });
    },
  });

  const watchContactMethod = watch('contactMethod');
  const watchGender = watch('gender');
  const watchAgeGroup = watch('ageGroup');
  const watchTags = watch('tags');

  const toggleArrayField = (
    fieldName: keyof Pick<BaropotFormData, 'gender' | 'ageGroup' | 'tags'>,
    value: string
  ) => {
    const currentValues = watch(fieldName) as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setValue(fieldName, newValues);
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    toggleArrayField,
    control,
    errors,
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    BAROPOT_CREATE_FORM_VALIDATE_RULES,
    isCreating,
    createError,
  };
};
