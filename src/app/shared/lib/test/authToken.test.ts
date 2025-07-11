import { describe, it, expect, vi } from 'vitest';
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from '@/app/shared/lib/authToken';

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
});

describe('authToken', () => {
  it('setAccessToken', () => {
    setAccessToken('testToken');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'access_token',
      'testToken'
    );
  });

  it('getAccessToken', () => {
    getAccessToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
  });

  it('removeAccessToken', () => {
    removeAccessToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
  });
});
