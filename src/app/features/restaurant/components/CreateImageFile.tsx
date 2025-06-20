import { useState } from "react";
import { FormData, UploadedImage } from "../types";
import { useImageUpload } from "@/app/shared/hooks/queries/useImageUpload";
import Image from "next/image";
import CreatedStatus from "./CreatedStatus";

interface CreateImageFileProps {
  formData: FormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  onImageUpload?: (url: string, index: number) => void;
}

export default function CreateImageFile({
  formData,
  handleFileChange,
  removeImage,
  onImageUpload,
}: CreateImageFileProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const { uploadImage, isUploading } = useImageUpload({
    onSuccess: (data) => {
      // 현재 업로드 중인 이미지를 찾아서 성공 상태로 업데이트
      setUploadedImages((prev) => {
        const uploadingIndex = prev.findIndex(
          (img) => img.uploading && !img.url && !img.error
        );
        if (uploadingIndex !== -1) {
          const newImages = [...prev];
          newImages[uploadingIndex] = {
            ...newImages[uploadingIndex],
            url: data.url,
            uploading: false,
          };

          // 부모 컴포넌트에 업로드된 URL 전달 (비동기로)
          setTimeout(() => {
            onImageUpload?.(data.url, uploadingIndex);
          }, 0);

          return newImages;
        }
        return prev;
      });
    },
    onError: (error) => {
      console.error("❌ 업로드 실패:", error);
      // 현재 업로드 중인 이미지를 찾아서 에러 상태로 업데이트
      setUploadedImages((prev) => {
        const uploadingIndex = prev.findIndex(
          (img) => img.uploading && !img.url && !img.error
        );
        if (uploadingIndex !== -1) {
          const newImages = [...prev];
          newImages[uploadingIndex] = {
            ...newImages[uploadingIndex],
            error: error.message,
            uploading: false,
          };
          return newImages;
        }
        return prev;
      });
    },
    maxSize: 10, // 10MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // 총 이미지 개수 제한 체크
    if (formData.images.length + files.length > 5) {
      alert("최대 5장까지만 업로드할 수 있습니다.");
      return;
    }
    // 기존 핸들러 호출 (폼 데이터 업데이트)
    handleFileChange(e);

    // 각 파일에 대해 업로드 상태 추가 및 업로드 시작
    files.forEach((file) => {
      const uploadId = Date.now() + Math.random().toString();
      // 업로드 상태 추가
      setUploadedImages((prev) => [
        ...prev,
        {
          file,
          uploading: true,
          uploadId,
        },
      ]);
      // 파일 업로드 시작
      uploadImage(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    removeImage(index);
  };

  const getUploadStatus = (index: number) => {
    const uploadedImg = uploadedImages[index];
    if (!uploadedImg) return null;

    if (uploadedImg.uploading) {
      return "uploading";
    } else if (uploadedImg.url) {
      return "success";
    } else if (uploadedImg.error) {
      return "error";
    }
    return null;
  };

  const handleRetryUpload = (index: number) => {
    const uploadedImg = uploadedImages[index];
    if (!uploadedImg) return;
    // 재시도 시 상태 초기화
    setUploadedImages((prev) =>
      prev.map((img, idx) =>
        idx === index ? { ...img, uploading: true, error: undefined } : img
      )
    );
    // 파일 재업로드
    uploadImage(uploadedImg.file);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <label className="block text-sm font-medium text-[#2B2B2B] mb-3">
        맛집 사진 (최대 5장, 각 10MB 이하)
      </label>

      {/* 업로드 영역 */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center mb-4 hover:border-blue-300 transition-colors">
        <label
          className={`cursor-pointer block ${
            isUploading || formData.images.length >= 5
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <div className="space-y-2">
            <div className="text-3xl">📸</div>
            <div className="text-sm text-[#8A8A8A]">
              {isUploading ? (
                <CreatedStatus type="isUploading" />
              ) : formData.images.length >= 5 ? (
                <span className="text-gray-500">최대 5장까지 업로드 가능</span>
              ) : (
                <>
                  <span className="text-[#1C4E80] hover:underline">
                    클릭해서 사진 선택
                  </span>
                  <br />
                  <span className="text-xs">
                    JPG, PNG, WebP 파일 (최대 5장, 각 10MB 이하)
                  </span>
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading || formData.images.length >= 5}
            className="hidden"
          />
        </label>
      </div>

      {/* 선택된 이미지 미리보기 */}
      {formData.images.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              선택된 이미지 ({formData.images.length}/5)
            </span>
            <button
              type="button"
              onClick={() => {
                // 모든 이미지 제거
                for (let i = formData.images.length - 1; i >= 0; i--) {
                  handleRemoveImage(i);
                }
              }}
              className="text-xs text-red-500 hover:underline"
            >
              전체 삭제
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {formData.images.map((file, index) => {
              const status = getUploadStatus(index);
              const uploadedImg = uploadedImages[index];

              return (
                <div key={`${index}-${file.name}`} className="relative group">
                  <div className="relative">
                    <Image
                      width={300}
                      height={300}
                      src={URL.createObjectURL(file)}
                      alt={`미리보기 ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-lg transition-opacity ${
                        status === "uploading" ? "opacity-50" : ""
                      }`}
                    />

                    {/* 업로드 상태 오버레이 */}
                    {status === "uploading" && (
                      <CreatedStatus type="uploading" />
                    )}

                    {/* 상태 아이콘 */}
                    <div className="absolute top-1 left-1">
                      {status === "success" && <CreatedStatus type="success" />}
                      {status === "error" && <CreatedStatus type="error" />}
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      disabled={status === "uploading"}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>

                  {/* 파일 정보 */}
                  <div className="mt-1">
                    <div className="text-xs text-gray-500 truncate">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(1)}MB
                    </div>
                  </div>

                  {/* 에러 메시지 */}
                  {uploadedImg?.error && (
                    <div className="absolute -bottom-12 left-0 right-0 text-xs text-red-500 bg-white p-2 rounded shadow-lg border z-10">
                      {uploadedImg.error}
                      <button
                        onClick={() => handleRetryUpload(index)}
                        className="block mt-1 text-blue-500 hover:underline"
                      >
                        다시 시도
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
