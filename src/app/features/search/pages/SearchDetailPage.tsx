"use client";
import RestaurantHeader from "../components/detail/RestaurantHeader";
import RestaurantImages from "../components/detail/RestaurantImages";
import RestaurantInfo from "../components/detail/RestaurantInfo";
import RestaurantReviews from "../../reviews/RestaurantReviews";
import RestaurantSection from "../components/detail/RestaurantSection";
import RestaurantMap from "../components/detail/RestaurantMap";
import { useRestaurantDetail } from "@/app/shared/hooks/queries/useRestaurant";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/app/shared/store/useAuthStore";

export default function SearchDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError,
  } = useRestaurantDetail(params.id);

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

  if (isError || !restaurant) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-lg">
            맛집 정보를 불러올 수 없습니다.
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
    <div>
      <RestaurantHeader />
      <RestaurantImages images={restaurant.photos} />
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />
      <RestaurantReviews restaurantId={params.id} currentUserId={user?.id} />
      <RestaurantSection />
      <RestaurantMap />
    </div>
  );
}
