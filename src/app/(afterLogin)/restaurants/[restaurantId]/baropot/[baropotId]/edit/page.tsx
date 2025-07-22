'use client';
import { useParams, useRouter } from 'next/navigation';
import { useGetBaropotDetail } from '@/app/shared/hooks/queries/useBaropot';
import { Button, Input, StateDisplay } from '@/app/shared/ui';
import { useToast } from '@/app/shared/hooks/useToast';
import { HiArrowLeft } from 'react-icons/hi';

export default function BaropotEditPage() {
  const params = useParams<{ baropotId: string }>();
  const toast = useToast();
  const router = useRouter();
  const baropotId = params.baropotId;

  const {
    data: baropot,
    isLoading,
    isError,
  } = useGetBaropotDetail(Number(baropotId));

  if (isLoading) {
    return <StateDisplay state="loading" size="lg" />;
  }

  if (isError || !baropot) {
    return <StateDisplay state="error" size="lg" />;
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex items-center px-4 py-3">
          <Button
            onClick={() => {
              router.back();
            }}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            icon={<HiArrowLeft className="h-4 w-4" />}
          />
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟 수정
          </h1>
          <Button
            onClick={() => {
              // TODO: 수정 로직 구현
              toast.success('수정되었습니다!');
              router.push(`/baropot/${baropotId}`);
            }}
            className="rounded-lg p-2 text-[#1C4E80] hover:bg-blue-50"
          >
            저장
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">바로팟 정보 수정</h2>
          <p className="mb-4 text-gray-600">
            바로팟 정보를 수정할 수 있습니다.
          </p>

          {/* TODO: 수정 폼 컴포넌트 추가 */}
          <div className="space-y-4">
            <Input type="text" defaultValue={baropot.title} label="제목" />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                설명
              </label>
              <textarea
                defaultValue={baropot.description}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#1C4E80] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
