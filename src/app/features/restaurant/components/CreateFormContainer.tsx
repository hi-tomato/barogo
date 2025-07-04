"use client";
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
import ImageUploader from "@/app/shared/components/ImageUploader";
import CreateFormActions from "./CreateFormActions";

export default function CreateFormContainer() {
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
    category: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    if (!formData.category) {
      alert("카테고리를 선택해주세요!");
      return;
    }
    if (!restaurant) {
      return;
    }

    const cleanPhoneNumber = (phone: string) => {
      return phone.replace(/[-\s]/g, ""); // 하이픈과 공백 제거
    };

    const photos: string[] = uploadUrls;
    const createRestaurantData: CreateRestaurantRequest = {
      name: restaurant.name,
      category: formData.category,
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
      onSuccess: (response) => {
        console.log("맛집 생성 성공:", response);
        sessionStorage.removeItem("selectedRestaurant");
        router.push("/main");
      },
      onError: (error) => {
        console.error("맛집 생성 실패:", error);
        alert("맛집 등록에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const isFormValid = formData.description.trim() && formData.category;

  if (isLoading) return <CreateStatus type="isLoading" />;
  if (!restaurant) return <CreateStatus type="notFound" />;

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <CreateHeader />
      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6 pb-24">
        <CreateBasicInfo restaurant={restaurant} />
        <CreatedeScription
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <ImageUploader
          onImagesChange={setUploadUrls}
          layout="grid"
          maxFiles={5}
        />
        <CreateTags
          formData={formData}
          handleInputChange={handleInputChange}
          addTag={addTag}
        />
        <CreateFormActions
          isPending={createRestaurant.isPending}
          isFormValid={!!isFormValid}
          onSubmit={handleSubmit}
        />
        <CreateStatus type="basicMessage" />
      </form>
    </div>
  );
}
