import { useMutation } from '@tanstack/react-query';
import { imageUploadService } from '../../services/imageUploadService';
import {
  errorHandler,
  FILE_CONFIG,
  fileValidator,
} from '../../lib/ImageUpload';

interface UploadResponse {
  url: string;
  key: string;
}

interface UseImageUploadOptions {
  onSuccess?: (data: UploadResponse, originalFile: File) => void;
  onError?: (error: Error, originalFile: File) => void;
  maxSize?: number;
  allowedTypes?: string[];
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    onSuccess,
    onError,
    maxSize = FILE_CONFIG.MAX_SIZE,
    allowedTypes = [...FILE_CONFIG.ALLOWED_TYPES],
  } = options;

  const mutation = useMutation({
    mutationFn: async (
      file: File
    ): Promise<{ data: UploadResponse; originalFile: File }> => {
      const validationError = fileValidator.getValidationError(file, {
        allowedTypes,
        maxSize,
      });
      if (validationError) {
        throw new Error(validationError);
      }

      const extension = fileValidator.getExtension(file.name);

      try {
        // Presigned URL 받기
        const { presignedUrl, key, url } =
          await imageUploadService.getPresignedUrl(extension);

        // S3에 파일 업로드
        await imageUploadService.uploadToS3(presignedUrl, file);

        return {
          data: { url, key },
          originalFile: file,
        };
      } catch (error: unknown) {
        throw new Error(errorHandler.getErrorMessage(error));
      }
    },
    onSuccess: ({ data, originalFile }) => {
      onSuccess?.(data, originalFile);
    },
    onError: (error, file) => {
      onError?.(error as Error, file);
    },
  });

  return {
    uploadImage: mutation.mutate,
    isUploading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
