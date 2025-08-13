import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAccessToken } from '../lib/authToken';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code?: string,
    message?: string
  ) {
    super(message || 'API 요청 실패');
    this.name = 'ApiError';
  }
}

export class BaseApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL!) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },

      maxContentLength: 10 * 1024 * 1024, // 10MB
      maxBodyLength: 10 * 1024 * 1024, // 10MB
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
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

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { response, code, message } = error;

        if (response) {
          throw new ApiError(
            response.status,
            response.data?.code,
            response.data?.message || error.message
          );
        }

        // 네트워크 오류 처리
        if (code === 'ERR_NETWORK') {
          throw new ApiError(
            0,
            'NETWORK_ERROR',
            '네트워크 연결을 확인해주세요'
          );
        }

        if (code === 'ECONNABORTED') {
          throw new ApiError(0, 'TIMEOUT_ERROR', '요청 시간이 초과되었습니다');
        }

        throw new ApiError(
          0,
          'UNKNOWN_ERROR',
          '알 수 없는 오류가 발생했습니다'
        );
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new BaseApiClient();
