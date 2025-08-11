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
    console.log('API 클라이언트 초기화:', {
      baseURL,
      env: process.env.NODE_ENV,
    });

    this.client = axios.create({
      baseURL,
      timeout: 15000, // 타임아웃을 15초로 증가
      headers: {
        'Content-Type': 'application/json',
      },
      // 메모리 사용량 최적화
      maxContentLength: 10 * 1024 * 1024, // 10MB
      maxBodyLength: 10 * 1024 * 1024, // 10MB
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 요청 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API 요청:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
          });
        }

        return config;
      },
      (error) => {
        console.error('API 요청 인터셉터 오류:', error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => {
        // 응답 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API 응답 성공:', {
            status: response.status,
            url: response.config.url,
          });
        }
        return response;
      },
      (error) => {
        const { response, code, message } = error;

        // 에러 로깅
        console.error('API 응답 오류:', {
          status: response?.status,
          code: response?.data?.code || code,
          message: response?.data?.message || message,
          url: response?.config?.url,
          baseURL: response?.config?.baseURL,
        });

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
      console.error('GET 요청 실패:', { url, error });
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
      console.error('POST 요청 실패:', { url, error });
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
      console.error('PATCH 요청 실패:', { url, error });
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error('DELETE 요청 실패:', { url, error });
      throw error;
    }
  }
}

export const apiClient = new BaseApiClient();
