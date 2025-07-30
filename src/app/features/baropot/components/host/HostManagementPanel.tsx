import { useState } from 'react';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion, AnimatePresence } from 'framer-motion';
import { HostManagementButton } from './HostManagementButton';
import { PanelHeader } from './PanelHeader';
import { StatusManagementSection } from './StatusManagementSection';
import { HostTabNavigation } from './HostTabNavigation';
import { HostParticipantList } from './HostParticipantList';
import { useHostManagement } from '@/app/shared/hooks/useHostManagement';

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

  const {
    isHost,
    activeTab,
    setActiveTab,
    hostMemos,
    pendingParticipants,
    approvedParticipants,
    participantActions,
    updateStatus,
    updateMemo,
    isParticipantActionPending,
    isStatusUpdatePending,
  } = useHostManagement({ baropot, currentUserId });

  const isModalOpen = isOpen !== undefined ? isOpen : isPanelOpen;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsPanelOpen(false);
    }
  };

  if (!isHost) return null;

  return (
    <>
      {isOpen === undefined && (
        <HostManagementButton onClick={() => setIsPanelOpen(true)} />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-[#000000af]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

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
                      onStatusChange={updateStatus}
                      isPending={isStatusUpdatePending}
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
                      onMemoChange={updateMemo}
                      onApprove={participantActions.approve}
                      onReject={participantActions.reject}
                      onRemove={participantActions.remove}
                      isPending={isParticipantActionPending}
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

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
