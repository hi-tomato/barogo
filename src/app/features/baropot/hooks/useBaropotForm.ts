import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useRouter } from "next/navigation";
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
  // Watch values
  const watchContactMethod = watch("contactMethod");
  const watchGender = watch("gender");
  const watchAgeGroup = watch("ageGroup");
  const watchTags = watch("tags");

  // 실제 API 훅 사용
  const createBaropotMutation = useCreateBaropot();

  // 체크박스 토글 함수
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

  // 폼 제출 함수
  const onSubmit = async (data: BaropotFormData) => {
    try {
      // API 스키마에 맞는 데이터 변환
      const submitData: CreateBaropotRequest = {
        restaurantId: restaurantData?.id ? parseInt(restaurantData.id) : 1, // 임시 ID
        title: data.title.trim(),
        location: data.meetingLocation.trim(),
        maxParticipants: parseInt(data.maxPeople),
        date: data.date,
        time: data.time,
        description: data.description?.trim() || "",
        tags: data.tags.join(","),

        // 선택적 필드들
        ...(data.gender.length > 0 && {
          participantGender: data.gender[0] as ParticipantGender,
        }),
        ...(data.ageGroup.length > 0 && {
          participantAgeGroup: data.ageGroup[0] as ParticipantAgeGroup,
        }),
        ...(data.contactMethod && {
          contactMethod: data.contactMethod as ContactMethod,
        }),
        ...(data.expectedCost?.trim() && {
          estimatedCostPerPerson: parseInt(data.expectedCost),
        }),
        ...(data.paymentMethod && {
          paymentMethod: data.paymentMethod as PaymentMethod,
        }),
        ...(data.rules?.trim() && { rule: data.rules.trim() }),
      };

      // 실제 API 호출
      await createBaropotMutation.mutateAsync(submitData);

      alert("✅ 바로팟이 생성되었습니다!");
      router.push("/baropot");
    } catch (error) {
      console.error("바로팟 생성 실패:", error);
      alert("❌ 바로팟 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    onSubmit,
    isSubmitting: createBaropotMutation.isPending,
  };
}

export const CONTACT_METHODS = [
  { value: "APP_CHAT", label: "앱 내 채팅", icon: "💬" },
  { value: "KAKAO_TALK", label: "카카오톡", icon: "🟡" },
  { value: "PHONE_NUMBER", label: "전화번호", icon: "📞" },
] as const;

export const PAYMENT_METHODS = [
  { value: "DUTCH_PAY", label: "더치페이", icon: "💰" },
  { value: "HOST_PAYS", label: "호스트가", icon: "🎁" },
  { value: "NEGOTIABLE", label: "현장에서 상의", icon: "🤝" },
];
