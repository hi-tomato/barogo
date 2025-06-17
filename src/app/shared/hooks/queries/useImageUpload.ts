import { useMutation } from "@tanstack/react-query";
import { imageUploadService } from "../../services/imageUploadService";

interface UploadResponse {
  url: string;
  key: string;
}

interface UseImageUploadOptions {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (error: Error) => void;
  maxSize?: number;
  allowedTypes?: string[];
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    onSuccess,
    onError,
    maxSize = 10,
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  const validateFile = (file: File): string | null => {
    // 파일 타입 검사
    if (!allowedTypes.includes(file.type)) {
      return `지원하지 않는 파일 형식입니다. (${allowedTypes.join(", ")})`;
    }

    // 파일 크기 검사 (MB 단위)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      return `파일 크기는 ${maxSize}MB 이하여야 합니다. (현재: ${fileSizeInMB.toFixed(
        1
      )}MB)`;
    }

    return null;
  };

  const getExtensionFromFileName = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    // 확장자가 없거나 지원하지 않는 경우 기본값 설정
    const supportedExtensions = ["jpg", "jpeg", "png", "webp"];
    if (!extension || !supportedExtensions.includes(extension)) {
      return "webp"; // 기본값
    }

    return extension === "jpeg" ? "jpg" : extension;
  };

  const mutation = useMutation({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      // 파일 유효성 검사
      const validationError = validateFile(file);
      if (validationError) {
        throw new Error(validationError);
      }

      // 확장자 추출
      const extension = getExtensionFromFileName(file.name);

      try {
        console.log("📤 이미지 업로드 시작:", {
          fileName: file.name,
          fileType: file.type,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
          extension,
        });

        // 1단계: Presigned URL 받기
        const { presignedUrl, key, url } =
          await imageUploadService.getPresignedUrl(extension);

        console.log("🔗 Presigned URL 받음, S3 업로드 시작...");

        // 2단계: S3에 파일 업로드
        await imageUploadService.uploadToS3(presignedUrl, file);

        console.log("✅ S3 업로드 완료:", { url, key });

        return { url, key };
      } catch (error: any) {
        console.error("❌ 이미지 업로드 실패:", error);

        // 에러 메시지 개선
        if (error.response?.status === 403) {
          throw new Error("업로드 권한이 없습니다.");
        } else if (error.response?.status === 400) {
          throw new Error("잘못된 파일 형식입니다.");
        } else if (error.response?.status >= 500) {
          throw new Error(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        } else {
          throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
    onSuccess: (data) => {
      console.log("이미지 업로드 성공:", data);
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("이미지 업로드 에러:", error);
      onError?.(error as Error);
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
