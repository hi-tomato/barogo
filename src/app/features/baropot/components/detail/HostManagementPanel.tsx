import { useParams } from "next/navigation";
import {
  useManageParticipant,
  useUpdateBaropotStatus,
} from "@/app/shared/hooks/queries/useBaropot";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { useState } from "react";
import { BaropotJoinedStatus, BaropotStatus } from "@/app/shared/types/enums";
import { motion } from "framer-motion";
import {
  HiCheckCircle,
  HiClock,
  HiExclamationCircle,
  HiUsers,
  HiXCircle,
} from "react-icons/hi";

const statusOptions = [
  {
    value: BaropotStatus.OPEN,
    label: "모집중",
    color: "bg-blue-500",
    icon: "🔵",
  },
  {
    value: BaropotStatus.FULL,
    label: "정원마감",
    color: "bg-orange-500",
    icon: "🟠",
  },
  {
    value: BaropotStatus.IN_PROGRESS,
    label: "진행중",
    color: "bg-green-500",
    icon: "🟢",
  },
  {
    value: BaropotStatus.COMPLETED,
    label: "완료",
    color: "bg-purple-500",
    icon: "🟣",
  },
  {
    value: BaropotStatus.CANCELLED,
    label: "취소",
    color: "bg-red-500",
    icon: "🔴",
  },
];

interface HostManagementPanelProps {
  baropot: BaropotDetailResponse;
  currentUserId: number;
}

// TODO: 바로팟 호스트 관리 패널
// 1. 참가자 승인/거절
// 2. 바로팟 상태변경 로직
// 3. 참가자 목록 관리

export default function HostManagementPanel({
  baropot,
  currentUserId,
}: HostManagementPanelProps) {
  const params = useParams();
  const baropotId = Number(params.id);

  const [activeTab, setActiveTab] = useState("pending");
  const [hostMemos, setHostMemos] = useState<Record<number, string>>({});

  const manageParticipantMutation = useManageParticipant();
  const updateBaropotStatusMutation = useUpdateBaropotStatus();

  const isHost = currentUserId === baropot.host.userId;

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
            hostMemo: hostMemos[participantUserId] || "",
          },
        },
        {
          onSuccess: () => {
            alert("참가자를 승인했습니다!");
            setHostMemos((prev) => ({
              ...prev,
              [participantUserId]: "",
            }));
          },
        }
      );
    } catch (error) {
      console.error("참가자 승인 실패", error);
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
            hostMemo: "호스트에 의해 강제 퇴장",
          },
        },
        {
          onSuccess: () => {
            alert("참가자를 거절했습니다!");
          },
        }
      );
    } catch (error) {
      console.error("참가자 거절 실패", error);
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
            hostMemo: "호스트에 의해 퇴장",
          },
        },
        {
          onSuccess: () => {
            alert("참가자를 퇴장시켰습니다!");
          },
        }
      );
    } catch (error) {
      console.error("참가자 퇴장 실패", error);
    }
  };

  const handleStatusChange = (newStatus: BaropotStatus) => {
    if (newStatus === baropot.status) return;

    try {
      updateBaropotStatusMutation.mutate({
        baropotId: baropot.id,
        status: newStatus,
      });
    } catch (error) {
      console.error("바로팟 상태 변경 실패", error);
    }
  };

  // 상태 라벨 가져오기
  const getStatusLabel = (status: BaropotStatus) => {
    return (
      statusOptions.find((option) => option.value === status)?.label || status
    );
  };

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 호스트가 아니면 표시하지 않음
  if (!isHost) {
    return null;
  }
  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="px-4 py-6">
        {/* 호스트 관리 헤더 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold text-[#2B2B2B] text-lg mb-2 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <HiUsers className="text-white text-lg" />
            </div>
            호스트 관리
          </h3>
          <p className="text-sm text-[#8A8A8A]">
            참가 신청을 관리하고 바로팟 상태를 변경하세요
          </p>
        </motion.div>

        {/* 바로팟 상태 변경 */}
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-semibold text-[#2B2B2B] mb-4 flex items-center">
            <HiClock className="mr-2 text-blue-600" />
            바로팟 상태 관리
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                disabled={updateBaropotStatusMutation.isPending}
                className={`p-3 rounded-xl text-center transition-all border-2 disabled:opacity-50 ${
                  baropot.status === option.value
                    ? `${option.color} text-white border-transparent shadow-lg`
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-medium">{option.label}</div>
              </motion.button>
            ))}
          </div>

          {updateBaropotStatusMutation.isPending && (
            <div className="mt-3 text-center text-sm text-blue-600">
              상태 변경 중...
            </div>
          )}
        </motion.div>

        {/* 참가자 관리 탭 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "pending"
                  ? "bg-white text-[#1C4E80] shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <HiExclamationCircle size={16} />
                <span>대기중 ({pendingParticipants.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "approved"
                  ? "bg-white text-[#1C4E80] shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <HiCheckCircle size={16} />
                <span>승인됨 ({approvedParticipants.length})</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* 참가자 목록 */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {activeTab === "pending" && (
            <>
              {pendingParticipants.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <HiExclamationCircle
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>대기중인 참가 신청이 없습니다</p>
                </div>
              ) : (
                pendingParticipants.map((participant, index) => (
                  <motion.div
                    key={participant.userId}
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {participant.name}
                          </h5>
                          <p className="text-xs text-gray-500">
                            신청시간: {formatTime(baropot.createdAt)}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        승인대기
                      </span>
                    </div>

                    {/* 호스트 메모 */}
                    <div className="mb-4">
                      <textarea
                        placeholder="참가자에 대한 메모를 남겨보세요 (선택사항)"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        value={hostMemos[participant.userId] || ""}
                        onChange={(e) =>
                          setHostMemos((prev) => ({
                            ...prev,
                            [participant.userId]: e.target.value,
                          }))
                        }
                        disabled={manageParticipantMutation.isPending}
                      />
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleApprove(participant.userId)}
                        disabled={manageParticipantMutation.isPending}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <HiCheckCircle size={16} />
                        <span>
                          {manageParticipantMutation.isPending
                            ? "처리중..."
                            : "승인"}
                        </span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleReject(participant.userId)}
                        disabled={manageParticipantMutation.isPending}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <HiXCircle size={16} />
                        <span>
                          {manageParticipantMutation.isPending
                            ? "처리중..."
                            : "거절"}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </>
          )}

          {activeTab === "approved" && (
            <>
              {approvedParticipants.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <HiCheckCircle
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>승인된 참가자가 없습니다</p>
                </div>
              ) : (
                approvedParticipants.map((participant, index) => (
                  <motion.div
                    key={participant.userId}
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {participant.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {participant.name}
                          </h5>
                          <p className="text-xs text-gray-500">
                            참가시간: {formatTime(baropot.createdAt)}
                          </p>
                          {participant.hostMemo && (
                            <p className="text-xs text-blue-600 mt-1">
                              💬 {participant.hostMemo}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          참가확정
                        </span>
                        <motion.button
                          onClick={() => handleRemove(participant.userId)}
                          disabled={manageParticipantMutation.isPending}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                        >
                          퇴장
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
