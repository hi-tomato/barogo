'use client';
import { useRouter } from 'next/navigation';
import BaropotHeader from '@/app/features/baropot/components/BaropotHeader';
import BaropotList from '@/app/features/baropot/components/BaropotList';
import Button from '@/app/shared/ui/Button';
import {
  useGetBaropotList,
  useJoinBaropot,
} from '@/app/shared/hooks/queries/useBaropot';

// TODO: 디버깅 완료되면, 탭 Filter을 도입하자
export default function BaropotModal() {
  const router = useRouter();

  const {
    data: baropotList = [],
    isLoading,
    error,
    refetch,
  } = useGetBaropotList();

  // 바로팟 참가 로직
  const joinMutation = useJoinBaropot();
  const handleJoin = (id: number) => {
    const joinMessage = prompt('참가 메시지를 입력해주세요');

    if (joinMessage) {
      joinMutation.mutate(
        {
          baropotId: id,
          message: {
            joinMessage: joinMessage,
          },
        },
        {
          onSuccess: () => {
            alert('바로팟에 참여했습니다.');
            refetch(); // 목록 새로고침
          },
          onError: () => {
            alert('바로팟에 참여하는데 실패했습니다.');
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000004c] p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <BaropotHeader onClose={() => router.back()} onRefresh={refetch} />
        {/* <BaropotTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}

        <div className="max-h-[60vh] overflow-y-auto p-4">
          <BaropotList
            baropotList={baropotList}
            isLoading={isLoading}
            error={error}
            onRefresh={refetch}
            onJoin={handleJoin}
            isJoining={joinMutation.isPending} // 추가
          />
        </div>

        <div className="border-t border-gray-100 p-4">
          <Button
            text="새 바로팟 만들기"
            className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition-colors hover:bg-blue-600"
            onClick={() => {
              router.back();
              setTimeout(() => {
                router.push('/restaurants');
              }, 100);
            }}
          />
        </div>
      </div>
    </div>
  );
}
