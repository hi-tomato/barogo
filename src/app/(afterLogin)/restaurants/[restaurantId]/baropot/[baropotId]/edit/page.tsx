"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetBaropotDetail } from "@/app/shared/hooks/queries/useBaropot";

export default function BaropotEditPage() {
  const params = useParams<{ baropotId: string }>();
  const router = useRouter();
  const baropotId = params.baropotId;

  const { data: baropot, isLoading, isError } = useGetBaropotDetail(baropotId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C4E80]"></div>
          <p className="text-[#1C4E80]">바로팟 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !baropot) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-lg">
            바로팟 정보를 불러올 수 없습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors"
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
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟 수정
          </h1>
          <button
            onClick={() => {
              // TODO: 수정 로직 구현
              alert("수정되었습니다!");
              router.push(`/baropot/${baropotId}`);
            }}
            className="p-2 text-[#1C4E80] hover:bg-blue-50 rounded-lg"
          >
            저장
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">바로팟 정보 수정</h2>
          <p className="text-gray-600 mb-4">
            바로팟 정보를 수정할 수 있습니다.
          </p>

          {/* TODO: 수정 폼 컴포넌트 추가 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                defaultValue={baropot.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                defaultValue={baropot.description}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
