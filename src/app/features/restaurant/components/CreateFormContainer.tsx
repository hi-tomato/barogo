'use client';
import React, { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateRestaurant } from '@/app/shared/hooks/queries/useRestaurant';
import { FormData, RestaurantData } from '../types';
import {
  CreateStatus,
  CreateHeader,
  CreateBasicInfo,
  CreateTags,
} from './index';
import CreatedeScription from './CreatedeScription';
import { CreateRestaurantRequest } from '@/app/shared/types/restaurant';
import ImageUploader from '@/app/shared/components/ImageUploader';
import CreateFormActions from './CreateFormActions';
import { useToast } from '@/app/shared/hooks/useToast';
import Modal from '@/app/shared/ui/Modal';
import SuccessModalContent from './SuccessModalContent';
import useFormReducer, { initialState } from '../hooks/useFormReducer';

export default function CreateFormContainer() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, dispatch] = useReducer(useFormReducer, initialState);

  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdRestaurant, setCreatedRestaurant] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const toast = useToast();

  const createRestaurant = useCreateRestaurant();

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('selectedRestaurant');
      if (data) {
        const restaurantData = JSON.parse(data);
        setRestaurant(restaurantData);

        if (restaurantData.x && restaurantData.y) {
          dispatch({
            type: 'SET_LOCATION',
            lat: parseFloat(restaurantData.y),
            lng: parseFloat(restaurantData.x),
          });
        }
      }
    } catch (error) {
      console.error('맛집 데이터 로드 실패:', error);
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
    dispatch({
      type: 'UPDATE_FIELD',
      field: name as keyof FormData,
      value,
    });
  };

  const addTag = (tag: string) => {
    const currentTags = formData.tags.split(',').filter((t) => t.length > 0);
    if (!currentTags.includes(tag)) {
      dispatch({
        type: 'ADD_TAG',
        tag,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      toast.error('맛집 설명을 입력해주세요!');
      return;
    }
    if (!formData.category) {
      toast.error('카테고리를 선택해주세요!');
      return;
    }
    if (!restaurant) {
      return;
    }

    const cleanPhoneNumber = (phone: string) => {
      return phone.replace(/[-\s]/g, '');
    };

    const photos: string[] = uploadUrls;
    const createRestaurantData: CreateRestaurantRequest = {
      name: restaurant.name,
      category: formData.category,
      address: restaurant.location,
      lat: Number(restaurant.y as number),
      lng: Number(restaurant.x as number),
      description: formData.description,
      phoneNumber: cleanPhoneNumber(restaurant.phone || ''),
      openingTime: formData.openingTime,
      closingTime: formData.closingTime,
      lastOrderTime: formData.lastOrderTime,
      tags: formData.tags.split(',').filter((tag) => tag.trim().length > 0),
      photos: photos,
    };

    createRestaurant.mutate(createRestaurantData, {
      onSuccess: (response) => {
        sessionStorage.removeItem('selectedRestaurant');

        setCreatedRestaurant({
          id: response.id,
          name: response.name,
        });
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error('맛집 생성 실패:', error);
        toast.error('맛집 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  const isFormValid = formData.description.trim() && formData.category;

  // Modal Handler
  const handleCreateBaropot = () => {
    if (createdRestaurant) {
      setShowSuccessModal(false);
      router.push(`/restaurants/${createdRestaurant.id}/baropot/create`);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/main');
  };

  if (isLoading) return <CreateStatus type="isLoading" />;
  if (!restaurant) return <CreateStatus type="notFound" />;

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <CreateHeader />
      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-6 pb-24">
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

      <Modal isOpen={showSuccessModal} onClose={handleCloseModal}>
        <SuccessModalContent
          restaurantName={createdRestaurant?.name || ''}
          onCreateBaropot={handleCreateBaropot}
        />
      </Modal>
    </div>
  );
}
