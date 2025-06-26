"use client";
import { useParams, useRouter } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { useRestaurantDetail } from "@/app/shared/hooks/queries/useRestaurant";
import { useAuthStore } from "@/app/shared/store/useAuthStore";
import RestaurantHeader from "@/app/features/search/components/detail/RestaurantHeader";
import RestaurantImages from "@/app/features/search/components/detail/RestaurantImages";
import RestaurantInfo from "@/app/features/search/components/detail/RestaurantInfo";
import RestaurantReviews from "@/app/features/reviews/RestaurantReviews";
import RestaurantSection from "@/app/features/search/components/detail/RestaurantSection";
import RestaurantMap from "@/app/features/search/components/detail/RestaurantMap";

export default function RestaurantDetailPage() {
  const params = useParams<{ restaurantId: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const restaurantId = params.restaurantId;

  // 레스토랑 정보 API 호출
  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: restaurantError,
  } = useRestaurantDetail(restaurantId);

  // 로딩 상태 처리
  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C4E80]"></div>
          <p className="text-[#1C4E80]">맛집 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (restaurantError || !restaurant) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-lg">
            맛집 정보를 불러올 수 없습니다.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#1C4E80] text-white rounded-lg hover:bg-[#154066] transition-colors"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5] pb-24">
      <RestaurantHeader restaurantName={restaurant.name} />
      <RestaurantImages images={restaurant.photos} />
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />
      <RestaurantReviews restaurantId={restaurantId} currentUserId={user?.id} />
      <RestaurantSection />
      <RestaurantMap />

      {/* 플로팅 바로팟 생성 버튼 */}
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
