import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BaropotFormData } from "../types/baropot";
import { RestaurantData } from "../../nearby/types/restaurant";

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
    // 서버 전송용 데이터 정리
    const submitData = {
      // 필수 필드
      title: data.title.trim(),
      restaurant: data.restaurant.trim(),
      meetingLocation: data.meetingLocation.trim(),
      date: data.date,
      time: data.time,
      maxPeople: parseInt(data.maxPeople),
      hostId: "user123", // TODO: 실제 로그인 사용자 ID
      contactMethod: data.contactMethod,

      // ⭐ 레스토랑 좌표 정보 추가
      restaurantCoordinates:
        restaurantData?.lat && restaurantData?.lng
          ? {
              lat: parseFloat(restaurantData.lat),
              lng: parseFloat(restaurantData.lng),
              kakaoId: restaurantData.kakaoId || restaurantData.id,
            }
          : null,

      // 시스템 필드
      status: "recruiting" as const,
      currentPeople: 1,
      createdAt: new Date(),

      // 선택 필드 (값이 있을 때만 포함)
      ...(data.description?.trim() && { description: data.description.trim() }),
      ...(data.expectedCost?.trim() && {
        expectedCost: data.expectedCost.trim(),
      }),
      ...(data.contactInfo?.trim() && { contactInfo: data.contactInfo.trim() }),
      ...(data.restaurantAddress?.trim() && {
        restaurantAddress: data.restaurantAddress.trim(),
      }),
      ...(data.paymentMethod && { paymentMethod: data.paymentMethod }),
      ...(data.gender.length > 0 && { gender: data.gender }),
      ...(data.ageGroup.length > 0 && { ageGroup: data.ageGroup }),
      ...(data.tags.length > 0 && { tags: data.tags }),
      ...(data.rules?.trim() && { rules: data.rules.trim() }),
    };

    console.log("서버 전송 데이터:", submitData);
    // TODO: 실제 API 호출
    // await baropot.create(submitData);

    alert("✅ 바로팟이 생성되었습니다!");
    router.push("/main");
  };

  return {
    watchContactMethod,
    watchGender,
    watchAgeGroup,
    watchTags,
    toggleArrayField,
    onSubmit,
  };
}

// utils/baropot.ts - 폼 관련 유틸리티 함수들
export const CONTACT_METHODS = [
  { value: "app", label: "앱 내 채팅", icon: "💬" },
  { value: "kakao", label: "카카오톡", icon: "🟡" },
  { value: "phone", label: "전화번호", icon: "📞" },
] as const;

export const PAYMENT_METHODS = [
  { value: "dutch", label: "더치페이", icon: "💰" },
  { value: "host", label: "호스트가", icon: "🎁" },
  { value: "discuss", label: "현장에서 상의", icon: "🤝" },
];
