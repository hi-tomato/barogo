import { BaropotListResponse } from '@/app/shared/types/baropots';
import { useRouter } from 'next/navigation';

export default function HostBaropotActionButton({
  baropot,
  onManageClick,
}: {
  baropot: BaropotListResponse;
  onManageClick: (baropotId: number) => void;
}) {
  const router = useRouter();

  const handleBaropotPannel = (baropotId: number) => {
    onManageClick(baropotId);
  };

  return (
    <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
      <button
        className="flex-1 rounded-lg bg-[#1C4E80] px-4 py-2 text-white transition-colors hover:bg-blue-700"
        onClick={(e) => {
          e.stopPropagation();
          handleBaropotPannel(baropot.id);
        }}
      >
        관리하기
      </button>
      <button
        className="rounded-lg border border-[#1C4E80] px-4 py-2 text-[#1C4E80] transition-colors hover:bg-[#E6EEF5]"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/baropot/${baropot.id}/edit`);
        }}
      >
        수정
      </button>
    </div>
  );
}
