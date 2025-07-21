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
  let result: {
    current: ReturnType<typeof useRegisterForm>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    const { result: hookResult } = renderHook(() => useRegisterForm(), {
      wrapper,
    });
    result = hookResult;

    act(() => {
      result.current.register('name', result.current.validateRules.name);
      result.current.register('email', result.current.validateRules.email);
      result.current.register(
        'password',
        result.current.validateRules.password
      );
    });
  });

  it('회원가입 인풋을 올바르게 작성하면, 회원가입 모달이 전달되면서 이동한다', async () => {
    await act(async () => {
      result.current.setValue('name', '이승준');
      result.current.setValue('email', 'admin@naver.com');
      result.current.setValue('password', 'Password1234!!');
      await result.current.handleSubmit();
    });

    expect(mockSignUp).toHaveBeenCalledWith(
      {
        name: '이승준',
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

  it('회원가입 폼을 잘못 작성하면 회원가입 폼이 전달되지 않는다', async () => {
    await act(async () => {
      result.current.setValue('name', 'tomato');
      result.current.setValue('email', 'invalid-email.com');
      result.current.setValue('password', 'Password1234!!');
      result.current.setValue('confirmPassword', 'Password1234!!');
      result.current.setValue('terms', true);

      await result.current.handleSubmit();
    });

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.email?.message).toBe(
      '올바른 이메일 형식이 아닙니다'
    );
  });
});
