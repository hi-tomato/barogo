import { motion } from 'framer-motion';
import { ParticipantCard } from './HostParicipantCard';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { EmptyState } from './EmptyState';

interface HostParticipantListProps {
  activeTab: string;
  pendingParticipants: any[];
  approvedParticipants: any[];
  hostMemos: Record<number, string>;
  onMemoChange: (userId: number, memo: string) => void;
  onApprove: (userId: number) => void;
  onReject: (userId: number) => void;
  onRemove: (userId: number) => void;
  isPending: boolean;
  formatTime: (date: string) => string;
  baropotCreatedAt: string;
}

export function HostParticipantList({
  activeTab,
  pendingParticipants,
  approvedParticipants,
  hostMemos,
  onMemoChange,
  onApprove,
  onReject,
  onRemove,
  isPending,
  formatTime,
  baropotCreatedAt,
}: HostParticipantListProps) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {activeTab === 'pending' && (
        <>
          {pendingParticipants.length === 0 ? (
            <EmptyState type="pending" icon={HiExclamationCircle} />
          ) : (
            pendingParticipants.map((participant, index) => (
              <ParticipantCard
                key={participant.userId}
                participant={participant}
                index={index}
                type="pending"
                hostMemo={hostMemos[participant.userId]}
                onMemoChange={onMemoChange}
                onApprove={onApprove}
                onReject={onReject}
                isPending={isPending}
                formatTime={formatTime}
                baropotCreatedAt={baropotCreatedAt}
              />
            ))
          )}
        </>
      )}

      {activeTab === 'approved' && (
        <>
          {approvedParticipants.length === 0 ? (
            <EmptyState type="approved" icon={HiCheckCircle} />
          ) : (
            approvedParticipants.map((participant, index) => (
              <ParticipantCard
                key={participant.userId}
                participant={participant}
                index={index}
                type="approved"
                onApprove={onApprove}
                onRemove={onRemove}
                isPending={isPending}
                formatTime={formatTime}
                baropotCreatedAt={baropotCreatedAt}
              />
            ))
          )}
        </>
      )}
    </motion.div>
  );
}
