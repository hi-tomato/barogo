'use client';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetBaropotDetail,
  useGetBaropotEdit,
} from '@/app/shared/hooks/queries/useBaropot';
import { useToast } from '@/app/shared/hooks/useToast';
import { BaropotEditRequest } from '@/app/shared/types/baropots';
import BaropotEditHeader from './BaropotEditHeader';
import BaropotEditForm from './BaropotEditForm';

export default function BaropotEditContainer() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const baropotId = Number(params.baropotId);

  const { data: baropot, isLoading: isLoadingDetail } =
    useGetBaropotDetail(baropotId);
  const updateBaropotMutation = useGetBaropotEdit();

  const handleSubmit = (formData: BaropotEditRequest) => {
    updateBaropotMutation.mutate(
      {
        baropotId,
        baropotData: formData,
      },
      {
        onSuccess: () => {
          toast.success('바로팟이 성공적으로 수정되었습니다.');
          router.push(`/baropot/${baropotId}`);
        },
        onError: () => {
          toast.error('바로팟 수정에 실패했습니다.');
        },
      }
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoadingDetail) {
    return (
      <div className="min-h-screen bg-[#E6EEF5]">
        <BaropotEditHeader />
        <div className="flex items-center justify-center p-8">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <BaropotEditHeader />
      <BaropotEditForm
        initialData={baropot}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateBaropotMutation.isPending}
      />
    </div>
  );
}
