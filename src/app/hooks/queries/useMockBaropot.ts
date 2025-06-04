import { queryKeys } from "@/app/lib/queryKeys";
import { baropot } from "@/app/services/mockapi";
import { BaropotTab } from "@/app/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBaropotList = (tab?: BaropotTab) => {
  return useQuery({
    queryKey: queryKeys.baropot.list(tab || "ongoing"),
    queryFn: async () => {
      const result = await baropot.getList(tab || "ongoing");
      console.log("API 결과:", result);
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
