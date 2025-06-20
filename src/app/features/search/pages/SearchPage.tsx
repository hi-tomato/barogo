"use client";
import HashtagSection from "@/app/features/search/components/HashtagSection";
import PromotionBanner from "@/app/features/search/components/PromotionBanner";
import RecommendedSearches from "@/app/features/search/components/RecommendedSearches";
import RestaurantPreviewModal from "@/app/features/search/components/RestaurantPreviewModal";
import SearchHeader from "@/app/features/search/components/SearchHeader";
import SearchResults from "@/app/features/search/components/SearchResults";

import { useGeolocation } from "@/app/shared/hooks/useGeolocation";
import { useRestaurantSearch } from "@/app/features/search/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NearbyRestaurant } from "@/app/shared/types";

export default function SearchPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<NearbyRestaurant | null>(null);

  const { location } = useGeolocation();

  const { query, setQuery, result, loading, error } = useRestaurantSearch({
    lat: location?.latitude,
    lng: location?.longitude,
  });

  const handleSelectRestaurant = (restaurant: NearbyRestaurant) => {
    setSelectedRestaurant(restaurant);
    setShowPreview(true);
  };

  const handleConfirmSelection = (restaurant: NearbyRestaurant) => {
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
    const baropotData = {
      name: restaurant.place_name,
      location: restaurant.address_name,
      category: restaurant.category_name,
      kakaoId: restaurant.id,
      lat: restaurant.y,
      lng: restaurant.x,
    };

    sessionStorage.setItem("selectedRestaurant", JSON.stringify(baropotData));

    router.back();
    setTimeout(() => {
      router.push(`/baropot/create/${restaurant.id}`);
    }, 100);
  };

  const handleSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
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
            <RecommendedSearches onSearchClick={handleSearchClick} />
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
