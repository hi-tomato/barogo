import { useUpdateRestaurant } from '@/app/shared/hooks/queries/useRestaurant';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { Button, Input, LoadingSpinner } from '@/app/shared/ui';
import React, { useState } from 'react';
import { HiClock, HiPencil, HiX } from 'react-icons/hi';
import { useToast } from '@/app/shared/hooks/useToast';

interface EditRestaurantModalProps {
  restaurant: RestaurantDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditRestaurantModal({
  restaurant,
  isOpen,
  onClose,
}: EditRestaurantModalProps) {
  const updateRestaurant = useUpdateRestaurant();
  const [newTag, setNewTag] = useState('');
  const toast = useToast();
  const [formData, setFormData] = useState({
    description: restaurant.description || '',
    photos: restaurant.photos || [],
    openingTime: restaurant.openingTime || '',
    closingTime: restaurant.closingTime || '',
    lastOrderTime: restaurant.lastOrderTime || '',
    tags: restaurant.restaurantToRestaurantTags || [],
  });
  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddTag = () => {
    if (newTag.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setNewTag('');
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateRestaurant.mutate(
        {
          restaurantId: restaurant.id.toString(),
          data: {
            ...formData,
            tags: formData.tags.map((tag) => tag.trim()),
          },
        },
        {
          onSuccess: () => {
            toast.success('맛집 정보가 수정되었습니다.');
            onClose();
          },
        }
      );
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <HiPencil className="text-lg text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                맛집 정보 수정
              </h2>
              <p className="text-sm text-gray-500">{restaurant.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* 설명 섹션 */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-medium text-gray-900">
                📝 맛집 설명
              </h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInput('description', e.target.value)}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="맛집에 대한 설명을 입력하세요"
              />
            </div>

            {/* 영업시간 섹션 */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-medium text-gray-900">
                <HiClock className="mr-2 inline" />
                영업시간
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                  type="time"
                  value={formData.openingTime}
                  onChange={(e) => handleInput('openingTime', e.target.value)}
                  label="오픈 시간"
                />
                <Input
                  type="time"
                  value={formData.closingTime}
                  onChange={(e) => handleInput('closingTime', e.target.value)}
                  label="마감 시간"
                />
                <Input
                  type="time"
                  value={formData.lastOrderTime}
                  onChange={(e) => handleInput('lastOrderTime', e.target.value)}
                  label="마지막 주문"
                />
              </div>
            </div>

            {/* 태그 섹션 */}
            <div className="space-y-4">
              <h3 className="border-b border-gray-100 pb-2 text-lg font-medium text-gray-900">
                🏷️ 태그
              </h3>

              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="태그를 입력하세요"
                  fullWidth={false}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-lg bg-blue-500 px-4 py-3 text-white transition-colors hover:bg-blue-600"
                >
                  추가
                </button>
              </div>

              {/* 태그 목록 */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="border-t border-gray-100 bg-gray-50 p-6">
            <div className="flex space-x-3">
              <Button
                text="취소"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
              />
              <button
                type="submit"
                disabled={updateRestaurant.isPending}
                className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-white transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateRestaurant.isPending ? (
                  <>
                    <LoadingSpinner size="sm" color="white" inline />
                    <span>수정 중...</span>
                  </>
                ) : (
                  <>
                    <HiPencil className="text-lg" />
                    <span>수정 완료</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
