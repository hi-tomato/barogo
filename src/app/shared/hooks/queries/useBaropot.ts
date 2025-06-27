import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/shared/lib/queryKeys";
import { baropotService } from "@/app/shared/services/baropotService";
import {
  CreateBaropotRequest,
  BaropotsQueries,
  JoinBaropotRequest,
} from "@/app/shared/types/baropots";

export const useGetBaropotList = (queries?: BaropotsQueries) => {
  return useQuery({
    queryKey: queryKeys.baropot.list(queries),
    queryFn: () => baropotService.getList(queries),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBaropot = () => {
  return useMutation({
    mutationFn: (baropotData: CreateBaropotRequest) =>
      baropotService.createBaropot(baropotData),
    onError: (error) => {
      console.error("바로팟을 생성하는데 문제가 발생하였음", error);
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
      console.error("바로팟에 참여하는데 문제가 발생하였음", error);
    },
  });
};

export const useGetBaropotDetail = (baropotId: number) => {
  return useQuery({
    queryKey: queryKeys.baropot.detail(baropotId),
    queryFn: () => baropotService.getDetail(baropotId),
  });
};
