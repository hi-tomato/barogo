"use client";
import HashtagSection from "@/app/components/search/HashtagSection";
import PromotionBanner from "@/app/components/search/PromotionBanner";
import RecommendedSearches from "@/app/components/search/RecommendedSearches";
import RestaurantPreviewModal from "@/app/components/search/RestaurantPreviewModal";
import SearchHeader from "@/app/components/search/SearchHeader";
import SearchResults from "@/app/components/search/SearchResults";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { useRestaurantSearch } from "@/app/hooks/useRestaurantSearch";
import { NearbyRestaurant } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { location } = useGeolocation();

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<NearbyRestaurant | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const { query, setQuery, result, loading, error } = useRestaurantSearch({
    lat: location?.latitude,
    lng: location?.longitude,
  });

  const handleSelectRestaurant = (restaurant: NearbyRestaurant) => {
    console.log("선택된 맛집 데이터:", restaurant);
    setSelectedRestaurant(restaurant);
    setShowPreview(true);
  };

  const handleConfirmSelection = (restaurant: NearbyRestaurant) => {
    console.log("확인된 맛집 데이터:", restaurant);
    if (
      !restaurant.id ||
      !restaurant.place_name ||
      !restaurant.address_name ||
      !restaurant.category_name ||
      !restaurant.x ||
      !restaurant.y
    ) {
      console.error("필수 데이터 누락:", {
        id: restaurant.id,
        place_name: restaurant.place_name,
        address_name: restaurant.address_name,
        category_name: restaurant.category_name,
        x: restaurant.x,
        y: restaurant.y,
      });

      console.error("맛집 정보가 불완전합니다. 다시 선택해주세요.");
      return;
    }

    const params = new URLSearchParams({
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      kakaoId: restaurant.id,
      lat: restaurant.y,
      lng: restaurant.x,
    });

    const targetUrl = `/baropot/create/${restaurant.id}?${params.toString()}`;
    console.log("이동할 URL:", targetUrl);
    console.log("URL 파라미터:", params.toString());

    router.push(targetUrl);
  };

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader query={query} setQuery={setQuery} loading={loading} />
      <div className="px-4 py-6 space-y-8">
        {query ? (
          <SearchResults
            results={result}
            loading={loading}
            error={error?.message || null}
            onSelectRestaurant={handleSelectRestaurant}
          />
        ) : (
          <>
            <RecommendedSearches />
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                어떤 매장을 찾으세요?
              </h2>
            </div>
            <PromotionBanner />
            <HashtagSection />
          </>
        )}
      </div>

      {selectedRestaurant && (
        <RestaurantPreviewModal
          restaurant={selectedRestaurant}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleConfirmSelection}
        />
      )}
    </div>
  );
}
