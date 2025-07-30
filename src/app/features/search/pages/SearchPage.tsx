'use client';
import HashtagSection from '@/app/features/search/components/HashtagSection';
import PromotionBanner from '@/app/features/search/components/PromotionBanner';
import RecommendedSearches from '@/app/features/search/components/RecommendedSearches';
import RestaurantPreviewModal from '@/app/features/search/components/RestaurantPreviewModal';
import SearchHeader from '@/app/features/search/components/SearchHeader';
import SearchResults from '@/app/features/search/components/SearchResults';

import { useGeolocation } from '@/app/shared/hooks/useGeolocation';
import { useRestaurantSearch } from '@/app/features/search/hooks/useSearch';
import { useRestaurantList } from '@/app/shared/hooks/queries/useRestaurant';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NearbyRestaurant } from '@/app/shared/types';

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

  // 서버에 등록된 맛집 목록 조회
  const { data: restaurantList } = useRestaurantList({});

  const handleSelectRestaurant = (restaurant: NearbyRestaurant) => {
    setSelectedRestaurant(restaurant);
    setShowPreview(true);
  };

  // 서버에 등록된 맛집 ID 확인 및 처리
  const handleConfirmSelection = (restaurant: NearbyRestaurant) => {
    if (
      !restaurant.id ||
      !restaurant.place_name ||
      !restaurant.address_name ||
      !restaurant.category_name ||
      !restaurant.x ||
      !restaurant.y
    ) {
      console.error('필수 데이터 누락:', {
        id: restaurant.id,
        place_name: restaurant.place_name,
        address_name: restaurant.address_name,
        category_name: restaurant.category_name,
        x: restaurant.x,
        y: restaurant.y,
      });
      console.error('맛집 정보가 불완전합니다. 다시 선택해주세요.');
      return;
    }

    // 서버에 등록된 맛집인지 확인
    const existingRestaurant = restaurantList?.find(
      (item) =>
        item.name === restaurant.place_name ||
        (item.name.includes(restaurant.place_name.split(' ')[0]) &&
          item.address === restaurant.address_name) ||
        item.id === Number(restaurant.id)
    );

    if (existingRestaurant) {
      // 이미 등록된 맛집인 경우 - 바로팟 생성 페이지로 이동
      const baropotData = {
        restaurantId: existingRestaurant.id, // 서버에 등록된 ID 사용
        name: existingRestaurant.name,
        location: existingRestaurant.address,
        category: existingRestaurant.category,
      };
      sessionStorage.setItem('selectedRestaurant', JSON.stringify(baropotData));

      router.back();
      setTimeout(() => {
        router.push(`/restaurants/${existingRestaurant.id}/baropot/create`);
      }, 100);
    } else {
      // 등록되지 않은 맛집인 경우 - 맛집 등록 페이지로 이동
      const restaurantData = {
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        kakaoId: restaurant.id,
        lat: restaurant.y,
        lng: restaurant.x,
      };
      sessionStorage.setItem(
        'selectedRestaurant',
        JSON.stringify(restaurantData)
      );

      router.back();
      setTimeout(() => {
        router.push(`/restaurants/create`);
      }, 100);
    }
  };

  const handleSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const queryParams = urlParams.get('query');

    if (queryParams && !query) {
      setQuery(queryParams);
    }
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <SearchHeader query={query} setQuery={setQuery} loading={loading} />
      <div className="space-y-8 px-4 py-6">
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
              <h2 className="mb-4 text-lg font-bold text-gray-900">
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
