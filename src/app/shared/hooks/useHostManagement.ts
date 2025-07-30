import { useState, useMemo } from 'react';
import {
  useManageParticipant,
  useUpdateBaropotStatus,
} from '@/app/shared/hooks/queries/useBaropot';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { BaropotJoinedStatus, BaropotStatus } from '@/app/shared/types/enums';
import { useToast } from '@/app/shared/hooks/useToast';

interface UseHostManagementProps {
  baropot: BaropotDetailResponse;
  currentUserId: number;
}

export const useHostManagement = ({
  baropot,
  currentUserId,
}: UseHostManagementProps) => {
  const [hostMemos, setHostMemos] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState('pending');
  const toast = useToast();

  const manageParticipantMutation = useManageParticipant();
  const updateBaropotStatusMutation = useUpdateBaropotStatus();

  const isHost = useMemo(() => {
    return currentUserId === baropot.host?.userId;
  }, [currentUserId, baropot.host?.userId]);

  const { pendingParticipants, approvedParticipants } = useMemo(() => {
    const pending = baropot.participants.filter(
      (participant) => participant.joinedStatus === BaropotJoinedStatus.PENDING
    );
    const approved = baropot.participants.filter(
      (participant) => participant.joinedStatus === BaropotJoinedStatus.APPROVED
    );

    return { pendingParticipants: pending, approvedParticipants: approved };
  }, [baropot.participants]);

  const participantActions = {
    approve: (participantUserId: number) => {
      manageParticipantMutation.mutate(
        {
          baropotId: baropot.id,
          participantData: {
            participantUserId,
            joinedStatus: BaropotJoinedStatus.APPROVED,
            hostMemo: hostMemos[participantUserId] || '',
          },
        },
        {
          onSuccess: () => {
            toast.success('참가자를 승인했습니다!');
            setHostMemos((prev) => ({ ...prev, [participantUserId]: '' }));
          },
          onError: (error) => {
            console.error('참가자 승인 실패', error);
            toast.error('참가자 승인에 실패했습니다.');
          },
        }
      );
    },

    reject: (participantUserId: number) => {
      manageParticipantMutation.mutate(
        {
          baropotId: baropot.id,
          participantData: {
            participantUserId,
            joinedStatus: BaropotJoinedStatus.REJECTED,
            hostMemo: '호스트에 의해 거절',
          },
        },
        {
          onSuccess: () => toast.success('참가자를 거절했습니다!'),
          onError: (error) => {
            console.error('참가자 거절 실패', error);
            toast.error('참가자 거절에 실패했습니다.');
          },
        }
      );
    },

    remove: (participantUserId: number) => {
      manageParticipantMutation.mutate(
        {
          baropotId: baropot.id,
          participantData: {
            participantUserId,
            joinedStatus: BaropotJoinedStatus.REJECTED,
            hostMemo: '호스트에 의해 퇴장',
          },
        },
        {
          onSuccess: () => toast.success('참가자를 퇴장시켰습니다!'),
          onError: (error) => {
            console.error('참가자 퇴장 실패', error);
            toast.error('참가자 퇴장에 실패했습니다.');
          },
        }
      );
    },
  };

  const updateStatus = (newStatus: BaropotStatus) => {
    if (newStatus === baropot.status) return;

    updateBaropotStatusMutation.mutate(
      {
        baropotId: baropot.id,
        status: { status: newStatus },
      },
      {
        onSuccess: () => toast.success('바로팟 상태가 변경되었습니다!'),
        onError: (error) => {
          console.error('바로팟 상태 변경 실패', error);
          toast.error('바로팟 상태 변경에 실패했습니다.');
        },
      }
    );
  };

  const updateMemo = (userId: number, memo: string) => {
    setHostMemos((prev) => ({ ...prev, [userId]: memo }));
  };

  return {
    /** Status */
    isHost,
    activeTab,
    setActiveTab,
    hostMemos,

    /** Data */
    pendingParticipants,
    approvedParticipants,

    /** Actions */
    participantActions,
    updateStatus,
    updateMemo,

    /** Loading */
    isParticipantActionPending: manageParticipantMutation.isPending,
    isStatusUpdatePending: updateBaropotStatusMutation.isPending,
  };
};
