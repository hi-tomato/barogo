import axios from "axios";
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// TODO: 백엔드 서버 들어오면, EndPoint 추가 및 서버에서 받아올 때 옵션값들 받아오기
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시, 토큰을 자동 추가 (인터셉트)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
