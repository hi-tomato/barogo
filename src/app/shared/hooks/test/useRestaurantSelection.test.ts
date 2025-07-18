import { describe, it, beforeEach, expect, vi } from 'vitest';
import { NearbyRestaurant } from '../../types';
import { useRestaurantSelection } from '../useRestaurantSelection';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/app/shared/hooks/queries/useRestaurant', () => ({
  useRestaurantList: () => ({
    data: [
      {
        id: 1,
        name: '이경문 순대곱창',
        address: '서울특별시 종로구',
        category: '한식',
        lat: 37.123,
        lng: 127.456,
        description: '맛있는 순대곱창',
        phoneNumber: '02-1234-5678',
        openingTime: '09:00',
        closingTime: '21:00',
        lastOrderTime: '20:30',
        photos: [],
        tags: ['한식', '순대곱창'],
        reviewCount: 10,
        isBookmarked: false,
      },
      {
        id: 2,
        name: '대동집',
        address: '서울특별시 광진구',
        category: '한식',
        lat: 37.456,
        lng: 127.789,
        description: '전통 한식',
        phoneNumber: '02-9876-5432',
        openingTime: '10:00',
        closingTime: '22:00',
        lastOrderTime: '21:30',
        photos: [],
        tags: ['한식'],
        reviewCount: 5,
        isBookmarked: false,
      },
    ],
  }),
}));

vi.mock('@/app/shared/hooks/queries/useBaropot', () => ({
  useCreateBaropot: () => ({
    mutateAsync: vi.fn().mockResolvedValue({ id: 123 }),
    isPending: false,
  }),
}));

vi.mock('@/app/shared/services/baropotService', () => ({
  baropotService: () => ({
    getBaropotByRestaurant: vi.fn(),
  }),
}));

describe('useRestaurantSelection', () => {
  const mockRestaurant: NearbyRestaurant = {
    id: '1',
    place_name: '기존 맛집',
    address_name: '서울시 강남구',
    category_name: '한식',
    phone: '02-1234-5678',
    x: '127.123',
    y: '37.456',
    distance: '100m',
    place_url: 'https://example.com',
  };

  const mockNewRestaurant: NearbyRestaurant = {
    id: '999',
    place_name: '완전히다른맛집',
    address_name: '부산시 해운대구',
    category_name: '중식',
    phone: '051-9876-5432',
    x: '129.789',
    y: '35.123',
    distance: '200m',
    place_url: 'https://example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('기존 맛집이 있을 때 바로팟 생성 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useRestaurantSelection({}));

    await act(async () => {
      await result.current.handleRestaurantSelection(mockRestaurant);
    });

    expect(result.current.isProcessing).toBe(false);
    expect(mockPush).toHaveBeenCalledWith('/restaurants/1/baropot/create');
  });

  it('새 맛집일 때 맛집 등록 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useRestaurantSelection({}));

    await act(async () => {
      await result.current.handleRestaurantSelection(mockNewRestaurant);
    });

    expect(result.current.isProcessing).toBe(false);
    expect(mockPush).toHaveBeenCalledWith('/restaurants/create');
  });

  it('기존 맛집일 때 바로팟 등록 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useRestaurantSelection({}));

    await act(async () => {
      await result.current.handleRestaurantSelection(mockRestaurant);
    });

    expect(result.current.isProcessing).toBe(false);
    expect(mockPush).toHaveBeenCalledWith('/restaurants/1/baropot/create');
  });

  it('중복 요청을 방지한다', async () => {
    const { result } = renderHook(() => useRestaurantSelection({}));

    const firstRequest =
      result.current.handleRestaurantSelection(mockRestaurant);

    setTimeout(async () => {
      await result.current.handleRestaurantSelection(mockNewRestaurant);
    }, 0);

    await firstRequest;

    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
