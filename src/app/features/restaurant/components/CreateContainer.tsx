"use client";
import Button from "@/app/shared/ui/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateRestaurant } from "@/app/shared/hooks/queries/useRestaurant";
import { FormData, RestaurantData } from "../types";
import {
  CreateStatus,
  CreateHeader,
  CreateBasicInfo,
  CreateTags,
} from "./index";
import CreatedeScription from "./CreatedeScription";
import { CreateRestaurantRequest } from "@/app/shared/types/restaurant";
import { mapKaKaoCategoryToServer } from "@/app/shared/lib/kakaoCategory";
import ImageUploader from "@/app/shared/components/ImageUploader";

export default function CreateContainer() {
  const router = useRouter();
  const createRestaurant = useCreateRestaurant();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    images: [],
    tags: "",
    openingTime: "09:00",
    closingTime: "21:00",
    lastOrderTime: "20:30",
  });
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem("selectedRestaurant");
      if (data) {
        const restaurantData = JSON.parse(data);
        setRestaurant(restaurantData);

        if (restaurantData.x && restaurantData.y) {
          setFormData((prev) => ({
            ...prev,
            lat: parseFloat(restaurantData.y),
            lng: parseFloat(restaurantData.x),
          }));
        }
      }
    } catch (error) {
      console.error("맛집 데이터 로드 실패:", error);
      router.back();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (tag: string) => {
    const currentTags = formData.tags.split(" ").filter((t) => t.length > 0);
    if (!currentTags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...currentTags, tag].join(" "),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert("맛집 설명을 입력해주세요!");
      return;
    }
    if (!restaurant) {
      return;
    }
    // TODO: 이미지 업로드는 별도 API 호출이 필요함.
    const cleanPhoneNumber = (phone: string) => {
      return phone.replace(/[-\s]/g, ""); // 하이픈과 공백 제거
    };

    const photos: string[] = uploadUrls;
    const createRestaurantData: CreateRestaurantRequest = {
      name: restaurant.name,
      category: mapKaKaoCategoryToServer(restaurant.category),
      address: restaurant.location,
      lat: Number(restaurant.y as number),
      lng: Number(restaurant.x as number),
      description: formData.description,
      phoneNumber: cleanPhoneNumber(restaurant.phone || ""),
      openingTime: formData.openingTime,
      closingTime: formData.closingTime,
      lastOrderTime: formData.lastOrderTime,
      tags: formData.tags.split(" ").filter((tag) => tag.trim().length > 0),
      photos: photos,
    };

    createRestaurant.mutate(createRestaurantData, {
      onSuccess: () => {
        sessionStorage.removeItem("selectedRestaurant");
        router.push("/main");
      },
    });
  };

  if (isLoading) return <CreateStatus type="isLoading" />;
  if (!restaurant) return <CreateStatus type="notFound" />;
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <CreateHeader />
      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6 pb-24">
        {/* 맛집 정보 표시 */}
        <CreateBasicInfo restaurant={restaurant} />
        {/* 맛집에 대한 설명 */}
        <CreatedeScription
          formData={formData}
          handleInputChange={handleInputChange}
        />
        {/* 사진 미리보기 & 등록 */}
        <ImageUploader
          onImagesChange={setUploadUrls}
          layout="grid"
          maxFiles={5}
        />
        {/* 태그 입력 & 태그 추천 */}
        <CreateTags
          formData={formData}
          handleInputChange={handleInputChange}
          addTag={addTag}
        />
        {/* 제출 버튼 */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={
              createRestaurant.isPending || !formData.description.trim()
            }
            className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createRestaurant.isPending ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                <span>등록 중...</span>
              </>
            ) : (
              <>
                <span>맛집 등록하기</span>
              </>
            )}
          </button>

          <Button
            text="취소"
            onClick={() => router.back()}
            disabled={createRestaurant.isPending}
            className="w-full border border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          />
        </div>
        {/* 안내 메시지 */}
        <CreateStatus type="basicMessage" />
      </form>
    </div>
  );
}
