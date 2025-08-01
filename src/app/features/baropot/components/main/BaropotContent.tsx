'use client';
import BaropotList from '@/app/features/baropot/components/BaropotList';
import {
  useGetBaropotList,
  useJoinBaropot,
} from '@/app/shared/hooks/queries/useBaropot';
import { useToast } from '@/app/shared/hooks/useToast';

export default function BaropotContent() {
  const toast = useToast();
  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useGetBaropotList();

  const joinBaropotMutation = useJoinBaropot();

  const handleJoin = (baropotId: number) => {
    const joinMessage = prompt('참가 메시지를 입력해주세요');

    if (joinMessage) {
      joinBaropotMutation.mutate(
        {
          baropotId,
          message: {
            joinMessage: joinMessage,
          },
        },
        {
          onSuccess: () => {
            toast.success('바로팟에 참여했습니다.');
            refetch();
          },
          onError: () => {
            toast.error('바로팟에 참여하는데 실패했습니다.');
          },
        }
      );
    }
  };

  return (
    <BaropotList
      baropotList={baropotList}
      isLoading={isLoading}
      error={error}
      onRefresh={refetch}
      onJoin={handleJoin}
      isJoining={joinBaropotMutation.isPending}
    />
  );
}
