import Image from "next/image";
import { HiX } from "react-icons/hi";

interface ImageFile {
  file: File;
  preview: string;
  url?: string;
  uploading: boolean;
  error?: string;
  id: string;
}

interface ImagePreviewProps {
  image: ImageFile;
  onRemove: () => void;
  onRetry: () => void;
  compact?: boolean;
}

export default function ImagePreview({
  image,
  onRemove,
  onRetry,
  compact = false,
}: ImagePreviewProps) {
  const size = compact ? "w-20 h-20" : "w-full h-20";

  return (
    <div className="relative group">
      <div className="relative">
        <Image
          width={compact ? 80 : 300}
          height={80}
          src={image.preview}
          alt="미리보기"
          className={`${size} object-cover rounded-lg transition-opacity ${
            image.uploading ? "opacity-50" : ""
          }`}
        />

        {/* 상태 오버레이 */}
        {image.uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* 상태 아이콘 */}
        <div className="absolute top-1 left-1">
          {image.url && (
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
          {image.error && (
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          )}
        </div>

        {/* 삭제 버튼 */}
        <button
          type="button"
          onClick={onRemove}
          disabled={image.uploading}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <HiX size={12} />
        </button>
      </div>

      {/* 파일 정보 */}
      {!compact && (
        <div className="mt-1">
          <div className="text-xs text-gray-500 truncate">
            {image.file.name}
          </div>
          <div className="text-xs text-gray-400">
            {(image.file.size / (1024 * 1024)).toFixed(1)}MB
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {image.error && (
        <div className="absolute -bottom-12 left-0 right-0 text-xs text-red-500 bg-white p-2 rounded shadow-lg border z-10">
          {image.error}
          <button
            onClick={onRetry}
            className="block mt-1 text-blue-500 hover:underline"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
