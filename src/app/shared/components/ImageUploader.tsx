import { useState, useEffect, useRef } from 'react';
import { useImageUpload } from '@/app/shared/hooks/queries/useImageUpload';
import ImagePreview from './ImagePreview';

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
  layout?: 'grid' | 'horizontal';
  disabled?: boolean;
}

export default function ImageUploader({
  onImagesChange,
  maxFiles = 5,
  maxSize = 10,
  layout = 'grid',
  disabled = false,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const prevImagesRef = useRef<ImageFile[]>([]);

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
    setImages((prev) => prev.filter((img) => img.id !== id));
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

  // 이미지 상태가 변경될 때마다 부모에게 URL 목록 전달
  useEffect(() => {
    const uploadedUrls = images.filter((img) => img.url).map((img) => img.url!);
    onImagesChange(uploadedUrls);
  }, [images, onImagesChange]);

  const canUploadMore = !disabled && images.length < maxFiles && !isUploading;

  return (
    <div className="space-y-4">
      {/* 업로드 영역 */}
      <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center transition-colors hover:border-blue-300">
        <label
          className={`block cursor-pointer ${
            !canUploadMore ? 'cursor-not-allowed opacity-50' : ''
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
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {images.length}/{maxFiles}장 선택됨
            </span>
            <button
              type="button"
              onClick={() => {
                setImages([]);
              }}
              className="text-xs text-red-500 hover:underline"
            >
              전체 삭제
            </button>
          </div>

          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-3 gap-3'
                : 'flex space-x-2 overflow-x-auto'
            }
          >
            {images.map((image) => (
              <ImagePreview
                key={image.id}
                image={image}
                onRemove={() => removeImage(image.id)}
                onRetry={() => retryUpload(image.id)}
                compact={layout === 'horizontal'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
