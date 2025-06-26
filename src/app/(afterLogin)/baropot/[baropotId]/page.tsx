"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetBaropotDetail } from "@/app/shared/hooks/queries/useBaropot";

export default function BaropotDetailPage() {
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
            바로팟 상세
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`/baropot/${baropotId}/edit`)}
              className="p-2 text-[#1C4E80] hover:bg-blue-50 rounded-lg"
            >
              수정
            </button>
            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  // TODO: 삭제 로직 구현
                  alert("삭제되었습니다!");
                  router.push("/baropot");
                }
              }}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* 바로팟 기본 정보 */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">{baropot.title}</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-gray-600 w-20">위치:</span>
              <span>{baropot.location}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20">날짜:</span>
              <span>{baropot.date}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20">시간:</span>
              <span>{baropot.time}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20">인원:</span>
              <span>
                {baropot.participantCount}/{baropot.maxParticipants}명
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-20">상태:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  baropot.status === "OPEN"
                    ? "bg-green-100 text-green-800"
                    : baropot.status === "FULL"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {baropot.status === "OPEN"
                  ? "모집중"
                  : baropot.status === "FULL"
                  ? "마감"
                  : "완료"}
              </span>
            </div>
          </div>
        </div>

        {/* 바로팟 설명 */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold mb-3">설명</h3>
          <p className="text-gray-700">{baropot.description}</p>
        </div>

        {/* 참여자 목록 */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">참여자 목록</h3>

          <div className="space-y-2">
            {baropot.participants && baropot.participants.length > 0 ? (
              baropot.participants.slice(0, 3).map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                >
                  <div className="w-8 h-8 bg-[#1C4E80] rounded-full flex items-center justify-center text-white text-sm">
                    {participant.name?.charAt(0) || "?"}
                  </div>
                  <span className="text-gray-700">{participant.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                아직 참여자가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex space-x-3">
          <button
            onClick={() => {
              // TODO: 참여 신청 로직
              alert("참여 신청되었습니다!");
            }}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            참여 신청
          </button>
        </div>
      </div>
    </div>
  );
}
