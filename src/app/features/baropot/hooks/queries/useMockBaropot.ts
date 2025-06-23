// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { queryKeys } from "@/app/shared/lib/queryKeys";
// import { BaropotTab } from "@/app/features/baropot/types/baropot";
// import { baropot } from "@/app/shared/services/mockapi";

// export const useBaropotList = (tab?: BaropotTab) => {
//   return useQuery({
//     queryKey: queryKeys.baropot.list(tab || "available"),
//     queryFn: async () => {
//       const result = await baropot.getList(tab || "available");
//       return result;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const useCreateBaropot = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: baropot.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.baropot.lists() });
//     },
//     onError: (error) => {
//       console.error(
//         "바로팟을 생성하는 도중에 에러가 발생하였습니다.",
//         error.message
//       );
//     },
//   });
// };

// export const useJoinBaropot = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: baropot.join,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.baropot.lists(),
//       });
//     },
//     onError: (error) => {
//       console.error(
//         "바로팟을 참가하는 도중에 에러가 발생하였습니다.",
//         error.message
//       );
//     },
//   });
// };
