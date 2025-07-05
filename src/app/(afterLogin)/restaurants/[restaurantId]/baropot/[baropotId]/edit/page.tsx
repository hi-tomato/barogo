'use client';
import { useParams, useRouter } from 'next/navigation';
import { useGetBaropotDetail } from '@/app/shared/hooks/queries/useBaropot';
import { Input } from '@/app/shared/ui';

export default function BaropotEditPage() {
  const params = useParams<{ baropotId: string }>();
  const router = useRouter();
  const baropotId = params.baropotId;

  const {
    data: baropot,
    isLoading,
    isError,
  } = useGetBaropotDetail(Number(baropotId));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#1C4E80]"></div>
          <p className="text-[#1C4E80]">바로팟 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !baropot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
        <div className="space-y-4 text-center">
          <p className="text-lg text-red-500">
            바로팟 정보를 불러올 수 없습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#1C4E80] px-4 py-2 text-white transition-colors hover:bg-[#154066]"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟 수정
          </h1>
          <button
            onClick={() => {
              // TODO: 수정 로직 구현
              alert('수정되었습니다!');
              router.push(`/baropot/${baropotId}`);
            }}
            className="rounded-lg p-2 text-[#1C4E80] hover:bg-blue-50"
          >
            저장
          </button>
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
