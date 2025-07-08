import { RestaurantData } from '@/app/features/restaurant/types';
import { useFormBase } from './useFormBase';
import { useParams, useRouter } from 'next/navigation';
import { BaropotFormData } from '@/app/features/baropot/types/baropot';
import { useCreateBaropot } from '@/app/shared/hooks/queries/useBaropot';
import { CreateBaropotRequest } from '@/app/shared/types/baropots';
import {
  ParticipantGender,
  ParticipantAgeGroup,
  ContactMethod,
  PaymentMethod,
} from '@/app/shared/types/enums';

export const useBaropotCreateForm = (restaurantData: RestaurantData | null) => {
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
    control,
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
        onSuccess: () => {
          alert('✅ 바로팟이 생성되었습니다!');
          router.push('/baropot');
        },
        onError: () => {
          alert('바로팟 생성에 실패했습니다. 다시 시도해주세요.');
        },
      });
    },
  });

  // Watch values for conditional rendering
  const watchContactMethod = watch('contactMethod');
  const watchGender = watch('gender');
  const watchAgeGroup = watch('ageGroup');
  const watchTags = watch('tags');

  // Toggle array fields
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

  // Validation rules
  const validateRules = {
    title: {
      required: '제목을 입력해주세요',
      minLength: { value: 2, message: '제목은 2자 이상이어야 합니다.' },
    },
    meetingLocation: {
      required: '만남 장소를 입력해주세요',
    },
    maxPeople: {
      required: '최대 인원을 입력해주세요',
      min: { value: 2, message: '최소 2명 이상이어야 합니다.' },
      max: { value: 20, message: '최대 20명까지 가능합니다.' },
    },
    date: {
      required: '날짜를 선택해주세요',
    },
    time: {
      required: '시간을 선택해주세요',
    },
    gender: {
      required: '성별 조건을 선택해주세요',
    },
    ageGroup: {
      required: '연령대 조건을 선택해주세요',
    },
    contactMethod: {
      required: '연락 방법을 선택해주세요',
    },
    paymentMethod: {
      required: '결제 방법을 선택해주세요',
    },
  };

  return {
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
    createError,
  };
};

// Helper functions
function mapGenderToEnum(genderArray: string[]): ParticipantGender {
  if (!genderArray || genderArray.length === 0) return ParticipantGender.ANY;
  const gender = genderArray[0];
  switch (gender) {
    case '남자':
    case 'MALE':
      return ParticipantGender.MALE;
    case '여자':
    case 'FEMALE':
      return ParticipantGender.FEMALE;
    default:
      return ParticipantGender.ANY;
  }
}

function mapAgeToEnum(ageArray: string[]): ParticipantAgeGroup {
  if (!ageArray || ageArray.length === 0) return ParticipantAgeGroup.ANY;
  const age = ageArray[0];
  switch (age) {
    case '20대':
    case 'TWENTIES':
      return ParticipantAgeGroup.TWENTIES;
    case '30대':
    case 'THIRTIES':
      return ParticipantAgeGroup.THIRTIES;
    case '40대':
    case 'FORTIES':
      return ParticipantAgeGroup.FORTIES;
    default:
      return ParticipantAgeGroup.ANY;
  }
}

function mapContactMethodToEnum(method: string): ContactMethod {
  switch (method) {
    case 'app':
    case 'APP_CHAT':
      return ContactMethod.APP_CHAT;
    case 'kakao':
    case 'KAKAO_TALK':
      return ContactMethod.KAKAO_TALK;
    case 'phone':
    case 'PHONE_NUMBER':
      return ContactMethod.PHONE_NUMBER;
    default:
      return ContactMethod.APP_CHAT;
  }
}

function mapPaymentMethodToEnum(method?: string): PaymentMethod {
  switch (method) {
    case 'dutch':
    case 'DUTCH_PAY':
      return PaymentMethod.DUTCH_PAY;
    case 'host':
    case 'HOST_PAYS':
      return PaymentMethod.HOST_PAYS;
    case 'discuss':
    case 'NEGOTIABLE':
      return PaymentMethod.NEGOTIABLE;
    default:
      return PaymentMethod.DUTCH_PAY;
  }
}
