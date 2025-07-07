import axios from 'axios';
import { apiClient } from '../api/client';

export interface PresignedUrlRequest {
  extension: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  key: string;
  url: string;
}

export class ImageUploadService {
  async getPresignedUrl(extension: string): Promise<PresignedUrlResponse> {
    const requestData: PresignedUrlRequest = { extension };

    return await apiClient.post<PresignedUrlResponse>(
      '/aws/presigned-url',
      requestData
    );
  }

  async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  }
}

// 싱글톤 인스턴스 생성
export const imageUploadService = new ImageUploadService();
