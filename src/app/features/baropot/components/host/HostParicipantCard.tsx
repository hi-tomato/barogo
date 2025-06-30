import { motion } from "framer-motion";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

interface ParticipantCardProps {
  participant: any;
  index: number;
  type: "pending" | "approved";
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
  const isPendingType = type === "pending";
  return (
    <motion.div
      key={participant.userId}
      className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
        isPendingType ? "border-amber-400" : "border-emerald-400"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isPendingType
                ? "bg-gradient-to-br from-[#1C4E80] to-[#C6A46A]"
                : "bg-gradient-to-br from-emerald-400 to-emerald-600"
            }`}
          >
            <span className="text-white font-bold text-sm">
              {participant.name.charAt(0)}
            </span>
          </div>
          <div>
            <h5 className="font-semibold text-[#2B2B2B]">{participant.name}</h5>
            <p className="text-xs text-[#8A8A8A]">
              {isPendingType ? "신청시간" : "참가시간"}:{" "}
              {formatTime(baropotCreatedAt)}
            </p>
            {!isPendingType && participant.hostMemo && (
              <p className="text-xs text-[#1C4E80] mt-1">
                💬 {participant.hostMemo}
              </p>
            )}
          </div>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-xs font-medium shadow-sm border ${
            isPendingType
              ? "bg-amber-100 text-amber-700 border-amber-200"
              : "bg-emerald-100 text-emerald-700 border-emerald-200"
          }`}
        >
          {isPendingType ? "승인대기" : "참가확정"}
        </span>
      </div>

      {/* 호스트 메모 (대기중인 참가자만) */}
      {isPendingType && onMemoChange && (
        <div className="mb-4">
          <textarea
            placeholder="참가자에 대한 메모를 남겨보세요 (선택사항)"
            className="w-full px-4 py-3 bg-[#E6EEF5]/30 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1C4E80]/40 focus:border-transparent"
            rows={2}
            value={hostMemo || ""}
            onChange={(e) => onMemoChange(participant.userId, e.target.value)}
            disabled={isPending}
          />
        </div>
      )}

      {/* 액션 버튼 */}
      {isPendingType ? (
        <div className="flex space-x-3">
          <motion.button
            onClick={() => onApprove?.(participant.userId)}
            disabled={isPending}
            className="flex-1 bg-emerald-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiCheckCircle size={16} />
            <span>{isPending ? "처리중..." : "승인"}</span>
          </motion.button>
          <motion.button
            onClick={() => onReject?.(participant.userId)}
            disabled={isPending}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiXCircle size={16} />
            <span>{isPending ? "처리중..." : "거절"}</span>
          </motion.button>
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-3">
          <motion.button
            onClick={() => onApprove?.(participant.userId)}
            disabled={isPending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-emerald-200 transition-colors duration-200 rounded-full"
          >
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium shadow-sm border border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300 transition-all duration-200">
              참가확정
            </span>
          </motion.button>
          <motion.button
            onClick={() => onRemove?.(participant.userId)}
            disabled={isPending}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-medium hover:bg-red-200 hover:shadow-md transition-all duration-200 disabled:opacity-50 border border-red-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            강퇴
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
