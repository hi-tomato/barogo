'use client';
import { useParams } from 'next/navigation';
import { useGetBaropotDetail } from '@/app/shared/hooks/queries/useBaropot';
import BaropotDetailHeader from '@/app/features/baropot/components/detail/BaropotDetailHeader';
import BaropotDetailContent from '@/app/features/baropot/components/detail/BaropotDetailContent';
import BaropotDetailAction from '@/app/features/baropot/components/detail/BaropotDetailAction';
import BaropotStatus from '@/app/features/baropot/components/detail/BaropotStatus';
import HostManagementPanel from '@/app/features/baropot/components/host/HostManagementPanel';
import { useAuthStore } from '@/app/shared/store/useAuthStore';

export default function BaropotDetailClient() {
  const params = useParams();
  const baropotId = Number(params.baropotId);
  const { user } = useAuthStore();
  const {
    data: baropot,
    isLoading,
    error,
    isError,
  } = useGetBaropotDetail(baropotId);

  const isHost =
    user?.id && baropot?.host?.id ? user.id === baropot.host.id : false;

  if (isLoading) {
    return <BaropotStatus type="isLoading" />;
  }

  if (isError || error || !baropot) {
    return <BaropotStatus type="isError" />;
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <BaropotDetailHeader />
      <BaropotDetailContent baropot={baropot} />
      <BaropotDetailAction baropot={baropot} />

      {/* 호스트인 경우에만 관리 패널 표시 */}
      {isHost && user?.id && (
        <HostManagementPanel baropot={baropot} currentUserId={user.id} />
      )}
    </div>
  );
}
