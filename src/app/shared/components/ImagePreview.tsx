import Image from 'next/image';
import { HiX } from 'react-icons/hi';

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
  const size = compact ? 'w-20 h-20' : 'w-full h-20';

  return (
    <div className="group relative">
      <div className="relative">
        <Image
          width={compact ? 80 : 300}
          height={compact ? 80 : 300}
          src={image.preview}
          alt="미리보기"
          className={`${size} rounded-lg object-cover transition-opacity ${
            image.uploading ? 'opacity-50' : ''
          }`}
        />

        {/* 상태 오버레이 */}
        {image.uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </div>
        )}

        {/* 상태 아이콘 */}
        <div className="absolute top-1 left-1">
          {image.url && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
              <span className="text-xs text-white">✓</span>
            </div>
          )}
          {image.error && (
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
              <span className="text-xs text-white">!</span>
            </div>
          )}
        </div>

        {/* 삭제 버튼 */}
        <button
          type="button"
          onClick={onRemove}
          disabled={image.uploading}
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600 disabled:opacity-50"
        >
          <HiX size={12} />
        </button>
      </div>

      {/* 파일 정보 */}
      {!compact && (
        <div className="mt-1">
          <div className="truncate text-xs text-gray-500">
            {image.file.name}
          </div>
          <div className="text-xs text-gray-400">
            {(image.file.size / (1024 * 1024)).toFixed(1)}MB
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {image.error && (
        <div className="absolute right-0 -bottom-12 left-0 z-10 rounded border bg-white p-2 text-xs text-red-500 shadow-lg">
          {image.error}
          <button
            onClick={onRetry}
            className="mt-1 block text-blue-500 hover:underline"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
