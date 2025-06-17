"use client";
import RestaurantHeader from "../components/detail/RestaurantHeader";
import RestaurantImages from "../components/detail/RestaurantImages";
import RestaurantInfo from "../components/detail/RestaurantInfo";
import RestaurantReviews from "../components/detail/RestaurantReviews";
import RestaurantSection from "../components/detail/RestaurantSection";
import RestaurantMap from "../components/detail/RestaurantMap";
import { useRestaurantDetail } from "@/app/shared/hooks/queries/useRestaurant";
import { useParams } from "next/navigation";

export default function SearchDetailPage() {
  const params = useParams<{ id: string }>();
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurantDetail(params.id);

  console.log("🔍 URL 파라미터 ID:", params.id);
  console.log("📊 받아온 맛집 데이터:", restaurant);

  if (isLoading) {
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
      <RestaurantImages />
      <RestaurantInfo restaurant={restaurant} />
      <RestaurantReviews />
      <RestaurantSection />
      <RestaurantMap />
    </div>
  );
}
