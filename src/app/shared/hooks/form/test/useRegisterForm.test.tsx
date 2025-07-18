import React, { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useRegisterForm } from '../useRegisterForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockSignUp = vi.fn();
vi.mock('@/app/shared/hooks/queries/useAuth', () => ({
  useSignUp: () => ({
    mutate: mockSignUp,
    isPending: false,
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('회원가입 폼 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('회원가입 폼 제출 시, 회원가입 폼이 전달되면서 모달이 열린다', async () => {
    const { result } = renderHook(() => useRegisterForm(), { wrapper });

    await act(async () => {
      result.current.setValue('name', 'tomato');
      result.current.setValue('email', 'admin@naver.com');
      result.current.setValue('password', 'Password1234!!');
      result.current.setValue('confirmPassword', 'Password1234!!');
      result.current.setValue('terms', true);

      await result.current.handleSubmit();
    });

    expect(mockSignUp).toHaveBeenCalledWith(
      {
        name: 'tomato',
        email: 'admin@naver.com',
        password: 'Password1234!!',
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );

    const onSuccessCallback = mockSignUp.mock.calls[0][1].onSuccess;
    act(() => {
      onSuccessCallback();
    });

    expect(result.current.showSuccessModal).toBe(true);
  });
});
