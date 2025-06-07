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
    setSelectedRestaurant(restaurant);
    setShowPreview(true);
  };

  const handleConfirmSelection = (restaurant: NearbyRestaurant) => {
    sessionStorage.setItem(
      "selectedRestaurant",
      JSON.stringify({
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || "",
      })
    );

    router.push(`/baropot/create/${restaurant.id}`);
  };
  return (
    <div className="min-h-screen bg-white">
      <SearchHeader query={query} setQuery={setQuery} loading={loading} />
      <div className="px-4 py-6 space-y-8">
        {/* 검색 결과가 있으면 결과 표시, 없으면 기본 컨텐츠 */}
        {query ? (
          <SearchResults
            results={result}
            loading={loading}
            error={error}
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
