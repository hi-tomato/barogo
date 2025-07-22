import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baropotChatService } from '@/app/shared/services/baropotChatService';
import { CreateChatRoomRequest } from '@/app/shared/types/baropotChat';
import { queryKeys } from '@/app/shared/lib/queryKeys';

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateChatRoomRequest) =>
      baropotChatService.createChatRoom(request),
    onSuccess: (data) => {
      console.log('채팅방 생성을 성공하였습니다', data.BaropotChatRoomId);
      queryClient.invalidateQueries({
        queryKey: queryKeys.baropot.chatRoom(data.BaropotChatRoomId),
      });
    },
    onError: (error) => {
      console.log('채팅방 생성을 실패하였습니다', error);
    },
  });
};
