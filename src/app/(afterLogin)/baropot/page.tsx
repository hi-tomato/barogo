'use client';

import { useRouter } from 'next/navigation';
import { HiPlus } from 'react-icons/hi';
import BaropotList from '@/app/features/baropot/components/BaropotList';
import {
  useGetBaropotList,
  useJoinBaropot,
} from '@/app/shared/hooks/queries/useBaropot';
import { Header } from '@/app/shared/ui';
import { useToast } from '@/app/shared/hooks/useToast';

// TODO: 디버깅 완료되면, 탭 Filter을 도입하자
export default function BaropotMainPage() {
  const router = useRouter();
  const toast = useToast();
  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useGetBaropotList();

  const joinBaropotMutation = useJoinBaropot();

  const handleJoin = (baropotId: number) => {
    const joinMessage = prompt('참가 메시지를 입력해주세요');

    if (joinMessage) {
      joinBaropotMutation.mutate(
        {
          baropotId,
          message: {
            joinMessage: joinMessage,
          },
        },
        {
          onSuccess: () => {
            toast.success('바로팟에 참여했습니다.');
            refetch(); // 목록 새로고침
          },
          onError: () => {
            toast.error('바로팟에 참여하는데 실패했습니다.');
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <Header
        title="바로팟"
        rightContent={
          <button
            onClick={() => router.push('/restaurants')}
            className="rounded-lg p-2 text-[#1C4E80] transition-colors hover:bg-blue-50"
          >
            <HiPlus size={24} />
          </button>
        }
      />

      {/* 상단 배너 */}
      <div className="mx-4 mt-4 rounded-xl bg-gradient-to-r from-[#1C4E80] to-[#2563eb] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-xl font-bold">⚡ 바로팟이란?</h2>
            <p className="text-sm opacity-90">
              혼자 가기 부담스러운 맛집,
              <br />
              지금 바로 함께할 사람을 찾아보세요!
            </p>
          </div>
          <div className="text-4xl">🍽️</div>
        </div>
      </div>

      <BaropotList
        baropotList={baropotList}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
        onJoin={handleJoin}
        isJoining={joinBaropotMutation.isPending}
      />

      {/* 플로팅 버튼 */}
      <button
        onClick={() => router.push('/restaurants')}
        className="fixed right-4 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1C4E80] text-white shadow-lg transition-all hover:shadow-xl"
      >
        <HiPlus size={24} />
      </button>
    </div>
  );
}
