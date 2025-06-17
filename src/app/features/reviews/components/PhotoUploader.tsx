import { useImageUpload } from "@/app/shared/hooks/queries/useImageUpload";
import { useState } from "react";
import { HiCamera, HiX } from "react-icons/hi";

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
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
        사진 첨부 (최대 {maxFiles}장)
      </label>
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
            disabled={
              disabled || selectedPhotos.length >= maxFiles || isUploading
            }
          />
          <div
            className={`w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-[#1C4E80] transition-colors ${
              disabled || selectedPhotos.length >= maxFiles || isUploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <HiCamera className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </label>

        {selectedPhotos.map((file, index) => {
          const uploadedPhoto = uploadedPhotos[index];

          return (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg ${
                  uploadedPhoto?.uploading ? "opacity-50" : ""
                }`}
              />

              {/* 업로드 상태 표시 */}
              {uploadedPhoto?.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* 업로드 성공 표시 */}
              {uploadedPhoto?.url && (
                <div className="absolute top-1 left-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              {/* 업로드 실패 표시 */}
              {uploadedPhoto?.error && (
                <div className="absolute top-1 left-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => removePhoto(index)}
                disabled={disabled || uploadedPhoto?.uploading}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                <HiX size={12} />
              </button>

              {/* 파일 정보 */}
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <div className="text-xs text-gray-500 truncate">
                  {(file.size / (1024 * 1024)).toFixed(1)}MB
                </div>
                {uploadedPhoto?.error && (
                  <div className="text-xs text-red-500 truncate">에러</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selectedPhotos.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          선택된 사진: {selectedPhotos.length}/{maxFiles}장
        </p>
      )}
    </div>
  );
}
