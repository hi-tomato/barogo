'use client';
import { useToast } from '@/app/shared/hooks/useToast';
import { Restaurant } from '@/app/shared/types/restaurant';
import Button from '@/app/shared/ui/Button';
import { useRouter } from 'next/navigation';

export default function PopupActions({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const toast = useToast();
  const router = useRouter();
  const handleDetailPage = () => {
    // TODO: 여기서 디테일 페이지로 이동하는 로직을 작성
    toast.success('상세보기 페이지로 이동합니다.');
    router.push(`/restaurants/${restaurant.id}`);
  };

  const handleBaropotPage = () => {
    // TODO: 07.23 현재 바로팟 상세페이지로 이동하기 전, /baropot으로 연결하여 전체리스트를 보여줄 수 있게 설정
    toast.success('바로팟 페이지로 이동합니다.');
    router.push('/baropot');
    // router.push(`/restaurants/${restaurant.id}/baropot/create`); TODO: 기존경로
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDetailPage}
        className="flex-1 rounded-lg bg-gray-100 py-2 text-center text-xs text-gray-700 transition hover:bg-gray-200"
      >
        상세보기
      </Button>
      {restaurant.hasBaropot && (
        <Button
          onClick={handleBaropotPage}
          className="flex-1 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 py-2 text-center text-xs text-white transition hover:shadow-md"
        >
          바로팟 참여 🔥
        </Button>
      )}
    </div>
  );
}
