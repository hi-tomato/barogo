import { useUpdateRestaurant } from "@/app/shared/hooks/queries/useRestaurant";
import { RestaurantDetail } from "@/app/shared/types/restaurant";
import Button from "@/app/shared/ui/Button";
import React, { useState } from "react";
import { HiClock, HiPencil, HiX } from "react-icons/hi";

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
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState({
    description: restaurant.description || "",
    photos: restaurant.photos || [],
    openingTime: restaurant.openingTime || "",
    closingTime: restaurant.closingTime || "",
    lastOrderTime: restaurant.lastOrderTime || "",
    tags: restaurant.restaurantToRestaurantTags || [],
  });
  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setNewTag("");
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
            alert("맛집 정보가 수정되었습니다.");
            onClose();
          },
        }
      );
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <HiPencil className="text-white text-lg" />
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
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="p-6 space-y-6">
            {/* 설명 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                📝 맛집 설명
              </h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInput("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="맛집에 대한 설명을 입력하세요"
              />
            </div>

            {/* 영업시간 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                <HiClock className="inline mr-2" />
                영업시간
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    오픈 시간
                  </label>
                  <input
                    type="time"
                    value={formData.openingTime}
                    onChange={(e) => handleInput("openingTime", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    마감 시간
                  </label>
                  <input
                    type="time"
                    value={formData.closingTime}
                    onChange={(e) => handleInput("closingTime", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    마지막 주문
                  </label>
                  <input
                    type="time"
                    value={formData.lastOrderTime}
                    onChange={(e) =>
                      handleInput("lastOrderTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 태그 섹션 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                🏷️ 태그
              </h3>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="태그를 입력하세요"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
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
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-3">
              <Button
                text="취소"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              />
              <button
                type="submit"
                disabled={updateRestaurant.isPending}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {updateRestaurant.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
