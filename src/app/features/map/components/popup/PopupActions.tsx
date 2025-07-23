'use client';
import { useToast } from '@/app/shared/hooks/useToast';
import { Restaurant } from '@/app/shared/types/restaurant';
// import Button from '@/app/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { HiEye, HiLightningBolt, HiPlus } from 'react-icons/hi';

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
    <div className="space-y-3">
      {/* 상세보기 버튼 */}
      <button
        onClick={handleDetailPage}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-95"
      >
        <HiEye className="h-4 w-4" />
        <span>상세보기</span>
      </button>

      {/* 바로팟 버튼 */}
      {restaurant.hasBaropot ? (
        <button
          onClick={handleBaropotPage}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-200 active:scale-95"
        >
          <HiLightningBolt className="h-4 w-4" />
          <span>바로팟 참여 🔥</span>
        </button>
      ) : (
        <button
          onClick={handleBaropotPage}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
        >
          <HiPlus className="h-4 w-4" />
          <span>바로팟 만들기</span>
        </button>
      )}
    </div>
  );
}
