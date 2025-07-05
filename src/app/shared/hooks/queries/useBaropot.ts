import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/app/shared/lib/queryKeys';
import { baropotService } from '@/app/shared/services/baropotService';
import {
  CreateBaropotRequest,
  BaropotsQueries,
  JoinBaropotRequest,
  BaropotEditRequest,
  ManageParticipantRequest,
} from '@/app/shared/types/baropots';
import { BaropotStatus } from '../../types/enums';

export const useGetBaropotList = (queries?: BaropotsQueries) => {
  return useQuery({
    queryKey: queryKeys.baropot.list(queries),
    queryFn: () => baropotService.getList(queries),
    staleTime: 1000 * 60 * 5,
  });
};

export const useBaropotByRestaurant = (restaurantId: number) => {
  return useQuery({
    queryKey: ['baropot', 'restaurant', restaurantId],
    queryFn: () => baropotService.getBaropotByRestaurant(restaurantId),
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateBaropot = () => {
  return useMutation({
    mutationFn: (baropotData: CreateBaropotRequest) =>
      baropotService.createBaropot(baropotData),
    onError: (error) => {
      console.error('바로팟을 생성하는데 문제가 발생하였음', error);
    },
  });
};

export const useJoinBaropot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      baropotId,
      message,
    }: {
      baropotId: number;
      message: JoinBaropotRequest;
    }) => baropotService.joinBaropot(baropotId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.lists(),
      });
    },
    onError: (error) => {
      console.error('바로팟에 참여하는데 문제가 발생하였음', error);
    },
  });
};

export const useGetBaropotDetail = (baropotId: number) => {
  return useQuery({
    queryKey: queryKeys.baropot.detail(baropotId),
    queryFn: () => baropotService.getDetail(baropotId),
  });
};

export const useGetBaropotEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      baropotId,
      baropotData,
    }: {
      baropotId: number;
      baropotData: BaropotEditRequest;
    }) => baropotService.updateBaropot(baropotId, baropotData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.detail(variables.baropotId),
      });
    },
  });
};

export const useManageParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      baropotId,
      participantData,
    }: {
      baropotId: number;
      participantData: ManageParticipantRequest;
    }) => baropotService.mangeParticipant(baropotId, participantData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.detail(variables.baropotId),
      });
    },
  });
};

export const useUpdateBaropotStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      baropotId,
      status,
    }: {
      baropotId: number;
      status: { status: BaropotStatus };
    }) => baropotService.updateStatus(baropotId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.detail(variables.baropotId),
      });
    },
  });
};

export const useGetHostBaropotList = (queries?: BaropotsQueries) => {
  return useQuery({
    queryKey: queryKeys.baropot.hostList(queries),
    queryFn: () => baropotService.getHostList(queries),
  });
};
