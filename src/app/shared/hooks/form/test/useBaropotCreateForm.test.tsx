import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBaropotCreateForm } from '../useBaropotCreateForm';
import { act, renderHook } from '@testing-library/react';
import { RestaurantData } from '@/app/features/restaurant/types';
import {
  ContactMethod,
  ParticipantAgeGroup,
  ParticipantGender,
  PaymentMethod,
} from '@/app/shared/types/enums';
import { CreateBaropotRequest } from '@/app/shared/types/baropots';

const mocks = vi.hoisted(() => {
  return {
    mockPush: vi.fn(),
    mockReplace: vi.fn(),
    mockRestaurantId: vi.fn().mockReturnValue('1004'),
    mockMutate: vi.fn(),
    mockAlert: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: mocks.mockPush,
    replace: mocks.mockReplace,
  }),
  useParams: vi.fn().mockReturnValue({
    restaurantId: mocks.mockRestaurantId(),
  }),
}));

vi.mock('@/app/shared/hooks/queries/useBaropot', () => ({
  useCreateBaropot: vi.fn().mockReturnValue({
    mutate: mocks.mockMutate,
    isPending: false,
    error: null,
  }),
}));

global.alert = mocks.mockAlert;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

const mockRestaurantData: RestaurantData = {
  id: '1004',
  name: '바로팟 식당',
  location: '서울시 강남구 역삼동 123-45',
  category: '한식',
  phone: '02-1234-5678',
  lat: 37.498095,
  lng: 126.851009,
  x: 126.851009,
  y: 37.498095,
};

describe('바로팟 생성 폼 테스트', () => {
  let result: {
    current: ReturnType<typeof useBaropotCreateForm>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockSessionStorage.getItem.mockReturnValue(null);

    const { result: hookResult } = renderHook(
      () => useBaropotCreateForm(mockRestaurantData),
      {
        wrapper,
      }
    );

    result = hookResult;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('필수 데이터가 누락되면, 서버로 전달되지 않는다.', async () => {
    await act(async () => {
      result.current.setValue('title', '');
      result.current.setValue('meetingLocation', '');
      result.current.setValue('maxPeople', '');
      result.current.setValue('date', '');
      result.current.setValue('time', '');
      result.current.setValue('gender', []);
      result.current.setValue('ageGroup', []);
      result.current.setValue('contactMethod', ContactMethod.APP_CHAT);
      result.current.setValue('paymentMethod', PaymentMethod.DUTCH_PAY);

      await result.current.handleSubmit();
    });

    expect(mocks.mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        title: '',
        location: '',
        maxParticipants: NaN,
        date: '',
        time: '',
        participantGender: 'ANY',
        participantAgeGroup: 'ANY',
      }),
      expect.any(Object)
    );
  });

  it('모든 필수 데이터가 올바르게 작성되면, 서버로 전달된다.', async () => {
    await act(async () => {
      result.current.setValue('title', '킹경문 맛집으로 꽁치님을 초대합니다.');
      result.current.setValue('meetingLocation', '종로 3가 123-45');
      result.current.setValue('maxPeople', '4');
      result.current.setValue('date', '2025-07-21');
      result.current.setValue('time', '18:00');
      result.current.setValue('gender', ['남자']);
      result.current.setValue('ageGroup', ['20대']);
      result.current.setValue('paymentMethod', PaymentMethod.DUTCH_PAY);
      result.current.setValue('contactMethod', ContactMethod.KAKAO_TALK);
      result.current.setValue('expectedCost', '10000');
      result.current.setValue('tags', ['순대곱창', '맛집', '종로']);
      result.current.setValue('description', '킹경문에는 소맥은 필수입니다.');
      result.current.setValue('rules', '시간 엄수 부탁드립니다.');

      await result.current.handleSubmit();
    });

    const expectedSubmitData: CreateBaropotRequest = {
      restaurantId: Number(mocks.mockRestaurantId()),
      title: '킹경문 맛집으로 꽁치님을 초대합니다.',
      location: '종로 3가 123-45',
      maxParticipants: 4,
      date: '2025-07-21',
      time: '18:00',
      participantGender: ParticipantGender.MALE,
      participantAgeGroup: ParticipantAgeGroup.TWENTIES,
      contactMethod: ContactMethod.KAKAO_TALK,
      paymentMethod: PaymentMethod.DUTCH_PAY,
      estimatedCostPerPerson: 10000,
      tags: ['순대곱창', '맛집', '종로'],
      description: '킹경문에는 소맥은 필수입니다.',
      rule: '시간 엄수 부탁드립니다.',
    };

    expect(mocks.mockMutate).toHaveBeenCalledWith(
      expectedSubmitData,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );

    act(() => {
      mocks.mockMutate.mock.calls[0][1].onSuccess();
    });

    expect(mocks.mockAlert).toHaveBeenCalledWith('✅ 바로팟이 생성되었습니다!');
    expect(mocks.mockPush).toHaveBeenCalledWith('/baropot');
  });
});
