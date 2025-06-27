import { useParams, useRouter } from "next/navigation";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";
import { motion } from "framer-motion";

interface BaropotDetailActionProps {
  baropot: BaropotDetailResponse;
}
export default function BaropotDetailAction({
  baropot,
}: BaropotDetailActionProps) {
  const router = useRouter();
  const params = useParams();
  const baropotId = Number(params.baropotId);
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#E6EEF5] p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex space-x-3 max-w-lg mx-auto">
        <button
          onClick={() => router.push(`/baropot/${baropotId}/edit`)}
          className="flex-1 py-4 border-2 border-[#1C4E80] text-[#1C4E80] rounded-2xl font-semibold hover:bg-[#E6EEF5] transition-all duration-200"
        >
          ✏️ 수정하기
        </button>
        <button
          onClick={() => {
            // TODO: 바로팟 참가 로직
            alert("바로팟에 참가했습니다!");
          }}
          disabled={baropot.status !== "OPEN"}
          className="flex-1 py-4 bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          🎉 참가하기
        </button>
      </div>
    </motion.div>
  );
}
