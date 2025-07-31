import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface ParticipantCardProps {
  participant: any;
  index: number;
  type: 'pending' | 'approved';
  hostMemo?: string;
  onMemoChange?: (userId: number, memo: string) => void;
  onApprove?: (userId: number) => void;
  onReject?: (userId: number) => void;
  onRemove?: (userId: number) => void;
  isPending: boolean;
  formatTime: (date: string) => string;
  baropotCreatedAt: string;
}

export function ParticipantCard({
  participant,
  index,
  type,
  hostMemo,
  onMemoChange,
  onApprove,
  onReject,
  onRemove,
  isPending,
  formatTime,
  baropotCreatedAt,
}: ParticipantCardProps) {
  const isPendingType = type === 'pending';

  return (
    <motion.div
      key={participant.userId}
      className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-600">
              {participant.name.charAt(0)}
            </span>
          </div>
          <div>
            <h5 className="font-medium text-gray-900">{participant.name}</h5>
            <p className="text-xs text-gray-500">
              {isPendingType ? '신청시간' : '참가시간'}:{' '}
              {formatTime(baropotCreatedAt)}
            </p>
            {!isPendingType && participant.hostMemo && (
              <p className="mt-1 text-xs text-blue-600">
                💬 {participant.hostMemo}
              </p>
            )}
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isPendingType
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {isPendingType ? '승인대기' : '참가확정'}
        </span>
      </div>

      {/* 호스트 메모 (대기중인 참가자만) */}
      {isPendingType && onMemoChange && (
        <div className="mb-4">
          <textarea
            placeholder="참가자에 대한 메모를 남겨보세요 (선택사항)"
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            rows={2}
            value={hostMemo || ''}
            onChange={(e) => onMemoChange(participant.userId, e.target.value)}
            disabled={isPending}
          />
        </div>
      )}

      {/* 액션 버튼 */}
      {isPendingType ? (
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onApprove?.(participant.userId)}
            disabled={isPending}
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <HiCheckCircle size={16} />
            <span>{isPending ? '처리중...' : '승인'}</span>
          </motion.button>
          <motion.button
            onClick={() => onReject?.(participant.userId)}
            disabled={isPending}
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <HiXCircle size={16} />
            <span>{isPending ? '처리중...' : '거절'}</span>
          </motion.button>
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-2">
          <motion.button
            onClick={() => onApprove?.(participant.userId)}
            disabled={isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg transition-colors duration-200 hover:bg-blue-50"
          >
            <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-all duration-200 hover:bg-blue-200">
              참가확정
            </span>
          </motion.button>
          <motion.button
            onClick={() => onRemove?.(participant.userId)}
            disabled={isPending}
            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-200 hover:shadow-sm disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            강퇴
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
