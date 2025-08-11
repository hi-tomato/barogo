import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFormBase } from '../useFormBase';

describe('useFormBase', () => {
  const defaultSearchValues = ['해뜰날 순대곱창', '이경문 순대곱창', '대동집'];

  it('초기 상태에는 isSubmitting은 false이다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useFormBase({ onSubmit, defaultValues: { defaultSearchValues } })
    );

    expect(result.current.isSubmitting).toBe(false);
  });

  it('폼 제출 시, isSubmitting 상태가 올바르게 관리된다', async () => {
    const onSubmit = vi
      .fn()
      .mockImplementation(() => new Promise((res) => setTimeout(res, 100)));

    const { result } = renderHook(() => useFormBase({ onSubmit }));

    expect(result.current.isSubmitting).toBe(false);

    await act(async () => {
      result.current.setValue('restaurants', defaultSearchValues);

      const submitPromise = result.current.handleSubmit();

      expect(result.current.isSubmitting).toBe(false);

      await submitPromise;
    });

    expect(onSubmit).toHaveBeenCalledWith({ restaurants: defaultSearchValues });
    expect(result.current.isSubmitting).toBe(false);
  });
});
