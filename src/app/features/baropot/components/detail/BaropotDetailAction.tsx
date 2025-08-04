'use client';
import { useParams, useRouter } from 'next/navigation';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { motion } from 'framer-motion';
import { useJoinBaropot } from '@/app/shared/hooks/queries/useBaropot';
import { useToast } from '@/app/shared/hooks/useToast';
import { useCreateChatRoom } from '@/app/shared/hooks/queries/useBaropotChat';

interface BaropotDetailActionProps {
  baropot: BaropotDetailResponse;
}

export default function BaropotDetailAction({
  baropot,
}: BaropotDetailActionProps) {
  const params = useParams();
  const baropotId = Number(params.baropotId);
  const toast = useToast();
  const joinBaropotMutation = useJoinBaropot();
  const router = useRouter();
  const handleJoinBaropot = () => {
    switch (baropot.status) {
      case 'OPEN':
        joinBaropotMutation.mutate(
          {
            baropotId,
            message: {
              joinMessage: '바로팟에 참가했습니다!',
            },
          },
          {
            onSuccess: () => {
              toast.success('바로팟에 참가했습니다!');
            },
            onError: () => {
              toast.error('바로팟 참가에 실패했습니다.');
            },
          }
        );
        break;
      case 'CANCELLED':
        toast.error('바로팟이 취소되었습니다.');
        break;
      case 'COMPLETED':
        toast.error('바로팟이 완료되었습니다.');
        break;
      case 'FULL':
        toast.error('바로팟이 가득 찼습니다.');
        break;
    }
  };

  const createChatRoomMutation = useCreateChatRoom();
  // TODO: 채팅방을 입장하는 API
  const handleJoinChat = async () => {
    console.log('채팅방을 입장합니다.');
    await createChatRoomMutation.mutateAsync(
      {
        baropotId,
        name: baropot.title,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          router.push(`/baropot/chat/${data.BaropotChatRoomId}`);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <motion.div
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white/95 p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
    >
      <div className="mx-auto flex max-w-lg space-x-4">
        {baropot.status === 'OPEN' && (
          <motion.button
            onClick={handleJoinChat}
            className="group relative z-99 flex-1 overflow-hidden rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            채팅방 입장
          </motion.button>
        )}

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
