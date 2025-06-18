import { useState } from "react";
import { useImageUpload } from "@/app/shared/hooks/queries/useImageUpload";
import ImagePreview from "./ImagePreview";

interface ImageFile {
  file: File;
  preview: string;
  url?: string;
  uploading: boolean;
  error?: string;
  id: string;
}

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
  layout?: "grid" | "horizontal";
  disabled?: boolean;
}

export default function ImageUploader({
  onImagesChange,
  maxFiles = 5,
  maxSize = 10,
  layout = "grid",
  disabled = false,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([]);

  const { uploadImage, isUploading } = useImageUpload({
    onSuccess: (data) => {
      setImages((prev) => {
        const newImages = prev.map((img) => {
          // 가장 최근에 업로드 시작한 이미지를 찾아 URL 업데이트
          if (img.uploading && !img.url && !img.error) {
            return { ...img, url: data.url, uploading: false };
          }
          return img;
        });

        // 업로드된 URL들만 필터링해서 부모에게 전달
        const uploadedUrls = newImages
          .filter((img) => img.url)
          .map((img) => img.url!);
        onImagesChange(uploadedUrls);

        return newImages;
      });
    },
    onError: (error) => {
      setImages((prev) =>
        prev.map((img) => {
          // 가장 최근에 업로드 시작한 이미지를 찾아 에러 상태로 업데이트
          if (img.uploading && !img.url && !img.error) {
            return { ...img, error: error.message, uploading: false };
          }
          return img;
        })
      );
    },
    maxSize,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}장까지만 업로드 가능합니다.`);
      return;
    }

    // 새 이미지들 추가
    const newImages: ImageFile[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true,
      error: undefined,
      id: `${Date.now()}_${Math.random()}`,
    }));

    setImages((prev) => [...prev, ...newImages]);

    // 업로드 시작
    newImages.forEach(({ file }) => uploadImage(file));
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);

      // URL 목록 업데이트
      const urls = updated.filter((img) => img.url).map((img) => img.url!);
      onImagesChange(urls);

      return updated;
    });
  };

  const retryUpload = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (!image) return;

    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, uploading: true, error: undefined } : img
      )
    );

    uploadImage(image.file);
  };

  const canUploadMore = !disabled && images.length < maxFiles && !isUploading;

  return (
    <div className="space-y-4">
      {/* 업로드 영역 */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
        <label
          className={`cursor-pointer block ${
            !canUploadMore ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="space-y-2">
            <div className="text-3xl">📸</div>
            <div className="text-sm text-gray-600">
              {isUploading ? (
                <span>업로드 중...</span>
              ) : !canUploadMore ? (
                <span>최대 {maxFiles}장까지 업로드 가능</span>
              ) : (
                <>
                  <span className="text-blue-600 hover:underline">
                    클릭해서 사진 선택
                  </span>
                  <br />
                  <span className="text-xs">
                    최대 {maxFiles}장, 각 {maxSize}MB 이하
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
            disabled={!canUploadMore}
            className="hidden"
          />
        </label>
      </div>

      {/* 이미지 목록 */}
      {images.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">
              {images.length}/{maxFiles}장 선택됨
            </span>
            <button
              type="button"
              onClick={() => {
                setImages([]);
                onImagesChange([]);
              }}
              className="text-xs text-red-500 hover:underline"
            >
              전체 삭제
            </button>
          </div>

          <div
            className={
              layout === "grid"
                ? "grid grid-cols-3 gap-3"
                : "flex space-x-2 overflow-x-auto"
            }
          >
            {images.map((image) => (
              <ImagePreview
                key={image.id}
                image={image}
                onRemove={() => removeImage(image.id)}
                onRetry={() => retryUpload(image.id)}
                compact={layout === "horizontal"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
