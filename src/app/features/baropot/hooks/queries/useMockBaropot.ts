import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/shared/lib/queryKeys";
import { BaropotTab } from "@/app/features/baropot/types/baropot";
import { baropot } from "@/app/shared/services/mockapi";

export const useBaropotList = (tab?: BaropotTab) => {
  return useQuery({
    queryKey: queryKeys.baropot.list(tab || "available"),
    queryFn: async () => {
      const result = await baropot.getList(tab || "available");
      console.log("API 결과:", result);
      console.log("API 결과2:", result);
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBaropot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: baropot.create,
    onSuccess: () => {
      console.log("바로팟 모임을 성공적으로 생성을 완료하였습니다.");
      queryClient.invalidateQueries({ queryKey: queryKeys.baropot.lists() });
    },
    onError: (error) => {
      console.error(
        "바로팟을 생성하는 도중에 에러가 발생하였습니다.",
        error.message
      );
    },
  });
};

export const useJoinBaropot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: baropot.join,
    onSuccess: () => {
      console.log("바로팟 모임에 성공적으로 등록하였습니다.");
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.lists(),
      });
    },
    onError: (error) => {
      console.error(
        "바로팟을 참가하는 도중에 에러가 발생하였습니다.",
        error.message
      );
    },
  });
};
