"use client";
import { useParams, useRouter } from "next/navigation";
import { HiPlus } from "react-icons/hi";

export default function RestaurantBaropotPage() {
  const params = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const restaurantId = params.restaurantId;

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
            이 맛집의 바로팟
          </h1>
          <button
            onClick={() =>
              router.push(`/restaurants/${restaurantId}/baropot/create`)
            }
            className="p-2 text-[#1C4E80] hover:bg-blue-50 rounded-lg"
          >
            <HiPlus size={24} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">이 맛집의 바로팟 목록</h2>
          <p className="text-gray-600 mb-4">
            이 맛집에서 진행 중인 바로팟을 확인하고 참여해보세요.
          </p>
        </div>

        {/* TODO: 바로팟 목록 컴포넌트 추가 */}
        <div className="bg-white rounded-lg p-6">
          <p className="text-center text-gray-500 py-8">
            아직 진행 중인 바로팟이 없습니다.
          </p>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={() =>
          router.push(`/restaurants/${restaurantId}/baropot/create`)
        }
        className="fixed bottom-24 right-4 bg-[#1C4E80] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-30"
      >
        <HiPlus size={24} />
      </button>
    </div>
  );
}
