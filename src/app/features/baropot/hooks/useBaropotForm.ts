import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { BaropotFormData } from "../types/baropot";
import { RestaurantData } from "../../nearby/types/restaurant";
import { useCreateBaropot } from "@/app/shared/hooks/queries/useBaropot";
import { CreateBaropotRequest } from "@/app/shared/types/baropots";
import {
  ParticipantGender,
  ParticipantAgeGroup,
  ContactMethod,
  PaymentMethod,
} from "@/app/shared/types/enums";

interface UseBaropotFormLogicProps {
  watch: UseFormWatch<BaropotFormData>;
  setValue: UseFormSetValue<BaropotFormData>;
  router: ReturnType<typeof useRouter>;
  restaurantData: RestaurantData | null;
}

export function useBaropotFormLogic({
  watch,
  setValue,
  router,
  restaurantData,
}: UseBaropotFormLogicProps) {
  const params = useParams();
  const createBaropot = useCreateBaropot();

  const watchContactMethod = watch("contactMethod");
  const watchGender = watch("gender");
  const watchAgeGroup = watch("ageGroup");
  const watchTags = watch("tags");

  const toggleArrayField = (
    fieldName: keyof Pick<BaropotFormData, "gender" | "ageGroup" | "tags">,
    value: string
  ) => {
    const currentValues = watch(fieldName) as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setValue(fieldName, newValues);
  };

  // TODO: 서버 스펙에 맞게 데이터 변환
  const onSubmit = async (data: BaropotFormData) => {
    // 서버에 보내는 restaurantID 값
    const restaurantId = (() => {
      if (params.restaurantId) {
        const id = Number(params.restaurantId);
        console.log("🔗 URL 파라미터에서 restaurantId 가져옴:", id);
        return id;
      }

      const storedData = sessionStorage.getItem("selectedRestaurant");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.restaurantId) {
          const id = Number(parsedData.restaurantId);
          return id;
        }
      }

      // 3. 기본값 사용
      const id = Number(restaurantData?.id) || 1;
      return id;
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
        ? parseInt(data.expectedCost.replace(/[^0-9]/g, ""))
        : undefined,

      tags: ((data.tags as string[]) || []).filter(
        (tag: string) => tag.trim().length > 0
      ),

      description: data.description?.trim() || "",
      rule: data.rules?.trim(),
    };

    //TODO: 실제 API 호출
    createBaropot.mutate(submitData, {
      onSuccess: () => {
        alert("✅ 바로팟이 생성되었습니다!");
        router.push("/baropot");
      },
      onError: () => {
        alert("바로팟 생성에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  return {
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    onSubmit,
    isSubmitting: createBaropot.isPending,
  };
}

// TODO: 서버에 보낼 떄 필터링하는 함수
function mapGenderToEnum(genderArray: string[]): ParticipantGender {
  if (!genderArray || genderArray.length === 0) return ParticipantGender.ANY;

  const gender = genderArray[0];
  switch (gender) {
    case "남자":
    case "MALE":
      return ParticipantGender.MALE;
    case "여자":
    case "FEMALE":
      return ParticipantGender.FEMALE;
    case "무관":
    case "ANY":
    default:
      return ParticipantGender.ANY;
  }
}

function mapAgeToEnum(ageArray: string[]): ParticipantAgeGroup {
  if (!ageArray || ageArray.length === 0) return ParticipantAgeGroup.ANY;

  const age = ageArray[0];
  switch (age) {
    case "20대":
    case "TWENTIES":
      return ParticipantAgeGroup.TWENTIES;
    case "30대":
    case "THIRTIES":
      return ParticipantAgeGroup.THIRTIES;
    case "40대":
    case "FORTIES":
      return ParticipantAgeGroup.FORTIES;
    case "무관":
    case "ANY":
    default:
      return ParticipantAgeGroup.ANY;
  }
}

function mapContactMethodToEnum(method: string): ContactMethod {
  switch (method) {
    case "app":
    case "APP_CHAT":
      return ContactMethod.APP_CHAT;
    case "kakao":
    case "KAKAO_TALK":
      return ContactMethod.KAKAO_TALK;
    case "phone":
    case "PHONE_NUMBER":
      return ContactMethod.PHONE_NUMBER;
    default:
      return ContactMethod.APP_CHAT;
  }
}

function mapPaymentMethodToEnum(method?: string): PaymentMethod {
  switch (method) {
    case "dutch":
    case "DUTCH_PAY":
      return PaymentMethod.DUTCH_PAY;
    case "host":
    case "HOST_PAYS":
      return PaymentMethod.HOST_PAYS;
    case "discuss":
    case "NEGOTIABLE":
      return PaymentMethod.NEGOTIABLE;
    default:
      return PaymentMethod.DUTCH_PAY;
  }
}

export const CONTACT_METHODS = [
  { value: ContactMethod.APP_CHAT, label: "앱 내 채팅", icon: "💬" },
  { value: ContactMethod.KAKAO_TALK, label: "카카오톡", icon: "🟡" },
  { value: ContactMethod.PHONE_NUMBER, label: "전화번호", icon: "📞" },
] as const;

export const PAYMENT_METHODS = [
  { value: PaymentMethod.DUTCH_PAY, label: "더치페이", icon: "💰" },
  { value: PaymentMethod.HOST_PAYS, label: "호스트가", icon: "🎁" },
  { value: PaymentMethod.NEGOTIABLE, label: "현장에서 상의", icon: "🤝" },
];
