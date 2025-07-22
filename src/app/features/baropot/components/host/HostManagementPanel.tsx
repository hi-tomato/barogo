import {
  useManageParticipant,
  useUpdateBaropotStatus,
} from '@/app/shared/hooks/queries/useBaropot';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { useState } from 'react';
import { BaropotJoinedStatus, BaropotStatus } from '@/app/shared/types/enums';
import { motion, AnimatePresence } from 'framer-motion';
import { HostManagementButton } from './HostManagementButton';
import { PanelHeader } from './PanelHeader';
import { StatusManagementSection } from './StatusManagementSection';
import { HostTabNavigation } from './HostTabNavigation';
import { HostParticipantList } from './HostParticipantList';
import { useToast } from '@/app/shared/hooks/useToast';

interface HostManagementPanelProps {
  baropot: BaropotDetailResponse;
  currentUserId: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function HostManagementPanel({
  baropot,
  currentUserId,
  isOpen,
  onClose,
}: HostManagementPanelProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [hostMemos, setHostMemos] = useState<Record<number, string>>({});
  const toast = useToast();

  const manageParticipantMutation = useManageParticipant();
  const updateBaropotStatusMutation = useUpdateBaropotStatus();

  const isHost = currentUserId === baropot.host.id;

  // 외부에서 제어하는 경우와 내부에서 제어하는 경우를 구분
  const isModalOpen = isOpen !== undefined ? isOpen : isPanelOpen;
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsPanelOpen(false);
    }
  };

  const pendingParticipants = baropot.participants.filter(
    (p) => p.joinedStatus === BaropotJoinedStatus.PENDING
  );
  const approvedParticipants = baropot.participants.filter(
    (p) => p.joinedStatus === BaropotJoinedStatus.APPROVED
  );

  const handleApprove = (participantUserId: number) => {
    try {
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
            setHostMemos((prev) => ({
              ...prev,
              [participantUserId]: '',
            }));
          },
        }
      );
    } catch (error) {
      console.error('참가자 승인 실패', error);
    }
  };

  const handleReject = (participantUserId: number) => {
    try {
      manageParticipantMutation.mutate(
        {
          baropotId: baropot.id,
          participantData: {
            participantUserId,
            joinedStatus: BaropotJoinedStatus.REJECTED,
            hostMemo: '호스트에 의해 강제 퇴장',
          },
        },
        {
          onSuccess: () => {
            toast.success('참가자를 거절했습니다!');
          },
        }
      );
    } catch (error) {
      console.error('참가자 거절 실패', error);
    }
  };

  const handleRemove = (participantUserId: number) => {
    console.log(participantUserId);
    try {
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
          onSuccess: () => {
            toast.success('참가자를 퇴장시켰습니다!');
          },
        }
      );
    } catch (error) {
      console.error('참가자 퇴장 실패', error);
    }
  };

  const handleStatusChange = (newStatus: BaropotStatus) => {
    if (newStatus === baropot.status) return;
    console.log(newStatus);
    try {
      updateBaropotStatusMutation.mutate({
        baropotId: baropot.id,
        status: { status: newStatus },
      });
    } catch (error) {
      console.error('바로팟 상태 변경 실패', error);
    }
  };

  const handleMemoChange = (userId: number, memo: string) => {
    setHostMemos((prev) => ({
      ...prev,
      [userId]: memo,
    }));
  };

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isHost) {
    return null;
  }

  return (
    <>
      {/* 외부에서 제어하지 않는 경우에만 버튼 표시 */}
      {isOpen === undefined && (
        <HostManagementButton onClick={() => setIsPanelOpen(true)} />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* 백드롭 */}
            <motion.div
              className="fixed inset-0 z-50 bg-[#000000af]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* 슬라이드 패널 */}
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="overflow-hidden rounded-t-3xl bg-[#E6EEF5] shadow-2xl">
                <PanelHeader onClose={handleClose} />

                <div className="max-h-[70vh] overflow-y-auto pb-6">
                  <div className="space-y-6 px-6 py-6">
                    <StatusManagementSection
                      baropot={baropot}
                      onStatusChange={handleStatusChange}
                      isPending={updateBaropotStatusMutation.isPending}
                    />

                    <HostTabNavigation
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      pendingCount={pendingParticipants.length}
                      approvedCount={approvedParticipants.length}
                    />

                    <HostParticipantList
                      activeTab={activeTab}
                      pendingParticipants={pendingParticipants}
                      approvedParticipants={approvedParticipants}
                      hostMemos={hostMemos}
                      onMemoChange={handleMemoChange}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onRemove={handleRemove}
                      isPending={manageParticipantMutation.isPending}
                      formatTime={formatTime}
                      baropotCreatedAt={baropot.createdAt}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
