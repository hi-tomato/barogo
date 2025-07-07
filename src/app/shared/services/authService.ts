import { apiClient } from '@/app/shared/api/client';
import {
  SignInRequest,
  SignInResponse,
  SignupRequest,
  SignupResponse,
  User,
} from '@/app/shared/types/auth';

export class AuthService {
  async signUp(params: SignupRequest): Promise<SignupResponse> {
    return await apiClient.post<SignupResponse>('/auth/signup', params);
  }

  async signIn(params: SignInRequest): Promise<SignInResponse> {
    return await apiClient.post<SignInResponse>('/auth/signin', params);
  }

  async getUser(): Promise<User> {
    return await apiClient.get<User>('/user/me');
  }
}

export const authService = new AuthService();
