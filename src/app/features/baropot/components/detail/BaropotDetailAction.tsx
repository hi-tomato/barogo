// BaropotDetailAction.tsx
import { useParams, useRouter } from 'next/navigation';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';
import { useJoinBaropot } from '@/app/shared/hooks/queries/useBaropot';

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
    if (baropot.status === 'OPEN') {
      joinBaropotMutation.mutate({
        baropotId,
        message: {
          joinMessage: '바로팟에 참가했습니다!',
        },
      });
    }
  };

  return (
    <motion.div
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white/95 p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
    >
      <div className="mx-auto flex max-w-lg space-x-4">
        <motion.button
          onClick={() => router.push(`/baropot/${baropotId}/edit`)}
          className="group relative flex-1 overflow-hidden rounded-xl border-2 border-blue-600 px-6 py-4 font-bold text-blue-600 transition-all duration-200 hover:bg-blue-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            <span>수정하기</span>
          </span>
        </motion.button>

        <motion.button
          onClick={handleJoinBaropot}
          disabled={baropot.status !== 'OPEN'}
          className="group relative flex-1 overflow-hidden rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            <span>참가하기</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
