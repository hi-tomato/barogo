"use client";
import { useParams } from "next/navigation";
import { useGetBaropotDetail } from "@/app/shared/hooks/queries/useBaropot";
import BaropotDetailHeader from "@/app/features/baropot/components/detail/BaropotDetailHeader";
import BaropotDetailContent from "@/app/features/baropot/components/detail/BaropotDetailContent";
import BaropotDetailAction from "@/app/features/baropot/components/detail/BaropotDetailAction";
import BaropotStatus from "@/app/features/baropot/components/detail/BaropotStatus";

export default function BaropotDetailPage() {
  const params = useParams();
  const baropotId = Number(params.baropotId);
  const { data: baropot, isLoading, error } = useGetBaropotDetail(baropotId);

  if (isLoading) {
    return <BaropotStatus type="isLoading" />;
  }
  if (error || !baropot) {
    return <BaropotStatus type="isError" />;
  }
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <BaropotDetailHeader />
      <BaropotDetailContent baropot={baropot} />
      <BaropotDetailAction baropot={baropot} />
    </div>
  );
}
