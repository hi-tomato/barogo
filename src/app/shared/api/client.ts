import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../lib/authToken";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function post<T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> {
  return apiClient.post(url, data);
}

export function get<T = any>(
  url: string,
  config?: any
): Promise<AxiosResponse<T>> {
  return apiClient.get<T>(url, config);
}

export function del<T = any>(
  url: string,
  config?: any
): Promise<AxiosResponse<T>> {
  return apiClient.delete<T>(url, config);
}

export function patch<T = any>(
  url: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> {
  return apiClient.patch<T>(url, data, config);
}

export function put<T = any>(
  url: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> {
  return apiClient.put<T>(url, data, config);
}
