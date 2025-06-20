import axios from "axios";
import { post } from "../api/client";

export interface PresignedUrlRequest {
  extension: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  key: string;
  url: string;
}

export const imageUploadService = {
  getPresignedUrl: async (extension: string): Promise<PresignedUrlResponse> => {
    const requestData: PresignedUrlRequest = { extension };

    const { data } = await post<PresignedUrlResponse>(
      "/aws/presigned-url",
      requestData
    );
    return data;
  },

  uploadToS3: async (presignedUrl: string, file: File): Promise<void> => {
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  },
};
