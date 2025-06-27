// BaropotDetailAction.tsx
import { useParams, useRouter } from "next/navigation";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";
import { useJoinBaropot } from "@/app/shared/hooks/queries/useBaropot";

interface BaropotDetailActionProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotDetailAction({
  baropot,
}: BaropotDetailActionProps) {
  const router = useRouter();
  const params = useParams();
  const baropotId = Number(params.baropotId);

  const joinBaropotMutation = useJoinBaropot();
  const handleJoinBaropot = () => {
    // TODO: 검증 케이스 추가 (상태에 맞춰서 입장할 수 있도록 처리)
    // - OPEN, CLOSED, FULL, CANCELLED, COMPLETED 상태에 맞춰서 처리
    // TODO: 상태 메세지 추가 모달창 구현
    if (baropot.status === "OPEN") {
      joinBaropotMutation.mutate({
        baropotId,
        message: {
          joinMessage: "바로팟에 참가했습니다!",
        },
      });
    } else {
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#E6EEF5]/50 p-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
    >
      <div className="flex space-x-4 max-w-lg mx-auto">
        <motion.button
          onClick={() => router.push(`/baropot/${baropotId}/edit`)}
          className="flex-1 py-4 px-6 border-3 border-[#1C4E80] text-[#1C4E80] rounded-2xl font-bold hover:bg-[#E6EEF5] transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C4E80]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>수정하기</span>
          </span>
        </motion.button>

        <motion.button
          onClick={handleJoinBaropot}
          disabled={baropot.status !== "OPEN"}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-[#1C4E80] via-[#2563eb] to-[#6366F1] text-white rounded-2xl font-bold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>참가하기</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
