import { useImageUpload } from '@/app/shared/hooks/queries/useImageUpload';
import Image from 'next/image';
import { useState } from 'react';
import { HiCamera, HiX } from 'react-icons/hi';
import { LoadingSpinner } from '@/app/shared/ui';

interface PhotoUploaderProps {
  selectedPhotos: File[];
  onPhotosChange: (photos: File[]) => void;
  onUploadedUrls?: (urls: string[]) => void;
  disabled?: boolean;
  maxFiles?: number;
}

interface UploadedPhoto {
  file: File;
  url?: string;
  uploading: boolean;
  error?: string;
}

export default function PhotoUploader({
  selectedPhotos,
  onPhotosChange,
  onUploadedUrls,
  disabled = false,
  maxFiles = 3,
}: PhotoUploaderProps) {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);

  const { uploadImage, isUploading } = useImageUpload({
    onSuccess: (data) => {
      // 업로드 성공 시 URL 업데이트
      setUploadedPhotos((prev) => {
        const newPhotos = prev.map((photo, idx) =>
          idx === prev.length - 1
            ? { ...photo, url: data.url, uploading: false }
            : photo
        );

        // 업로드된 URL들만 필터링해서 부모에게 전달
        const uploadedUrls = newPhotos
          .filter((photo) => photo.url)
          .map((photo) => photo.url!);
        onUploadedUrls?.(uploadedUrls);

        return newPhotos;
      });
    },
    onError: (error) => {
      setUploadedPhotos((prev) =>
        prev.map((photo, idx) =>
          idx === prev.length - 1
            ? { ...photo, error: error.message, uploading: false }
            : photo
        )
      );
    },
    maxSize: 10,
  });

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedPhotos.length > maxFiles) {
      alert(`최대 ${maxFiles}장까지만 업로드 가능합니다.`);
      return;
    }

    // 파일 추가
    onPhotosChange([...selectedPhotos, ...files]);

    // 각 파일을 업로드 시작
    files.forEach((file) => {
      setUploadedPhotos((prev) => [...prev, { file, uploading: true }]);
      uploadImage(file);
    });
  };

  const removePhoto = (index: number) => {
    onPhotosChange(selectedPhotos.filter((_, i) => i !== index));
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));

    // 업로드된 URL 목록 업데이트
    const remainingUrls = uploadedPhotos
      .filter((_, i) => i !== index)
      .filter((photo) => photo.url)
      .map((photo) => photo.url!);
    onUploadedUrls?.(remainingUrls);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoSelect}
          disabled={
            disabled || selectedPhotos.length >= maxFiles || isUploading
          }
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className={`cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400 hover:bg-blue-50 ${
            disabled || selectedPhotos.length >= maxFiles || isUploading
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
        >
          <div className="text-gray-600">
            <div className="mb-2 text-2xl">📷</div>
            <p className="text-sm">
              {selectedPhotos.length >= maxFiles
                ? '최대 파일 수에 도달했습니다'
                : '사진을 선택하세요'}
            </p>
            <p className="mt-1 text-xs text-gray-500">최대 {maxFiles}개 파일</p>
          </div>
        </label>
      </div>

      {selectedPhotos.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {selectedPhotos.map((file, index) => {
            const uploadedPhoto = uploadedPhotos[index];

            return (
              <div key={index} className="group relative">
                <Image
                  width={20}
                  height={20}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className={`rounded-lg object-cover ${
                    uploadedPhoto?.uploading ? 'opacity-50' : ''
                  }`}
                />

                {/* 업로드 상태 표시 */}
                {uploadedPhoto?.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
                    <LoadingSpinner size="sm" color="white" inline />
                  </div>
                )}

                {/* 업로드 성공 표시 */}
                {uploadedPhoto?.url && (
                  <div className="absolute top-1 left-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                    <span className="text-xs text-white">✓</span>
                  </div>
                )}

                {/* 업로드 실패 표시 */}
                {uploadedPhoto?.error && (
                  <div className="absolute top-1 left-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                    <span className="text-xs text-white">!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  disabled={disabled || uploadedPhoto?.uploading}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600 disabled:opacity-50"
                >
                  <HiX size={12} />
                </button>

                {/* 파일 정보 */}
                <div className="mt-2 text-xs text-gray-500">
                  <p className="truncate">{file.name}</p>
                  <p>{(file.size / 1024 / 1024).toFixed(1)}MB</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
