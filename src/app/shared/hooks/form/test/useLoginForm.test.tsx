import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useLoginForm } from '../useLoginForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { beforeEach } from 'node:test';
import { authService } from '@/app/shared/services/authService';
import { setAccessToken } from '@/app/shared/lib/authToken';

vi.mock('@/app/shared/store/useAuthStore', () => ({
  useAuthStore: () => ({
    setUser: vi.fn(),
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/app/shared/lib/authToken', () => ({
  setAccessToken: vi.fn(),
}));

vi.mock('@/app/shared/services/authService', () => ({
  authService: {
    signIn: vi.fn(),
    getUser: vi.fn(),
  },
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('로그인의 관련된 훅들을 검사한다.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('register, handleSubmit, errors를 반환해야 한다.', () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toBeDefined();
    expect(result.current.LOGIN_FORM_VALIDATE_RULES).toBeDefined();
    expect(result.current.isLoginPending).toBe(false);
    expect(result.current.loginError).toBe(null);
  });

  it('폼 제출 시 로그인 함수가 제출된다', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    await act(async () => {
      result.current.setValue('email', 'admin@naver.com');
      result.current.setValue('password', 'Password1234!!');
      await result.current.handleSubmit();
    });

    expect(authService.signIn).toHaveBeenCalledWith({
      email: 'admin@naver.com',
      password: 'Password1234!!',
    });
  });

  it('로그인이 완료되면 토큰을 성공적으로 저장한다', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    const mockSignIn = vi.mocked(authService.signIn);
    mockSignIn.mockResolvedValue({
      accessToken: 'test_token',
    });

    const mockGetUser = vi.mocked(authService.getUser);
    mockGetUser.mockResolvedValue({
      id: 1,
      email: 'admin@naver.com',
      name: 'tomato',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await act(async () => {
      result.current.setValue('email', 'admin@naver.com');
      result.current.setValue('password', 'Password1234!!');
      await result.current.handleSubmit();
    });

    expect(authService.getUser).toHaveBeenCalled();
    expect(setAccessToken).toHaveBeenCalledWith('test_token');
  });
});
