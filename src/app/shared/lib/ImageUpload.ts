// 상수
export const FILE_CONFIG = {
  MAX_SIZE: 10,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  SUPPORTED_EXTENSIONS: ["jpg", "jpeg", "png", "webp"],
} as const;
// 에러 메세지
export const ERROR_MESSAGES = {
  403: "업로드 권한이 없습니다.",
  400: "잘못된 파일 형식입니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  default: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
} as const;

// 파일 검증 (확장자, 크기)
export const fileValidator = {
  validateType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  validateSize: (file: File, maxSizeMB: number): boolean => {
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB <= maxSizeMB;
  },

  getValidationError: (
    file: File,
    options: { allowedTypes: string[]; maxSize: number }
  ): string | null => {
    if (!fileValidator.validateType(file, options.allowedTypes)) {
      return `지원하지 않는 파일 형식입니다. (${options.allowedTypes.join(
        ", "
      )})`;
    }

    if (!fileValidator.validateSize(file, options.maxSize)) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      return `파일 크기는 ${options.maxSize}MB 이하여야 합니다. (현재: ${fileSizeInMB}MB)`;
    }

    return null;
  },

  getExtension: (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension &&
      FILE_CONFIG.SUPPORTED_EXTENSIONS.includes(extension as any)
      ? extension === "jpeg"
        ? "jpg"
        : extension
      : "webp"; // 기본값
  },
};

// 에러 처리
export const errorHandler = {
  getErrorMessage: (error: any): string => {
    const status = error.response?.status;
    return (
      ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] ||
      ERROR_MESSAGES.default
    );
  },
};
