import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/shared/lib/queryKeys";
import { baropotService } from "@/app/shared/services/baropotService";
import {
  CreateBaropotRequest,
  BaropotsQueries,
} from "@/app/shared/types/baropots";

export const useBaropot = (queries?: BaropotsQueries) => {
  return useQuery({
    queryKey: queryKeys.baropot.list(queries),
    queryFn: () => baropotService.getList(queries),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBaropot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (baropotData: CreateBaropotRequest) =>
      baropotService.createBaropot(baropotData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.lists(),
      });
    },
    onError: (error) => {
      console.error("바로팟을 생성하는데 문제가 발생하였음", error);
    },
  });
};
