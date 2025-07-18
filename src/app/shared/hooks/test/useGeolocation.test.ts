import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGeolocation } from '../useGeolocation';

describe('사용자의 위치 정보를 가져오는 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('위치 서비스가 없을 때 에러 메세지를 출력한다', () => {
    Object.defineProperty(global, 'navigate', {
      value: {
        geolocation: undefined,
      },
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.error).toBe('위치 서비스를 지원하지 않습니다');
    expect(result.current.isLoading).toBe(false);
  });

  it('위치 권한이 거부되었을 때 에러 메세지를 출력한다', () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success, error) => {
        error({ code: 1, message: 'Permission denied' });
      }),
    };

    Object.defineProperty(global, 'navigator', {
      value: {
        geolocation: mockGeolocation,
      },
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.error).toBe('위치 권한을 허용해주세요');
  });

  it('사용자의 위치를 저장하였을 떄', async () => {
    const mockPosition = {
      coords: {
        latitude: 37.5665,
        longitude: 126.978,
      },
    };

    const mockGeolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success) => {
        success(mockPosition);
      }),
    };

    Object.defineProperty(global, 'navigator', {
      value: {
        geolocation: mockGeolocation,
      },
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());
    await act(async () => {
      await result.current.getCurrentLocation();
    });

    expect(result.current.location?.longitude).toBe(
      mockPosition.coords.longitude
    );
    expect(result.current.location?.latitude).toBe(
      mockPosition.coords.latitude
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
