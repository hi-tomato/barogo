'use client';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { RestaurantImage } from '@/app/features/search/components/detail/RestaurantImages';
import { StateDisplay } from '@/app/shared/ui';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RestaurantInfo = dynamic(
  () => import('@/app/features/search/components/detail/RestaurantInfo'),
  {
    ssr: true,
    loading: () => (
      <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
    ),
  }
);

const RestaurantReviews = dynamic(
  () => import('@/app/features/reviews/RestaurantReviews'),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 animate-pulse rounded-lg bg-gray-100" />
    ),
  }
);

const RestaurantSection = dynamic(
  () => import('@/app/features/search/components/detail/RestaurantSection'),
  {
    ssr: true,
    loading: () => (
      <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
    ),
  }
);
export default function RestaurantDetailClient({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const { user } = useAuthStore();

  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: restaurantError,
  } = useRestaurantDetail(restaurantId);

  if (restaurantLoading) {
    return <StateDisplay state="loading" size="lg" />;
  }

  if (restaurantError || !restaurant) {
    return <StateDisplay state="error" size="lg" />;
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5] pb-24">
      <RestaurantImage images={restaurant.photos} />
      <Suspense
        fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-100" />}
      >
        <RestaurantInfo
          restaurant={restaurant}
          isOwner={restaurant.isWrittenByMe}
        />
      </Suspense>
      <Suspense
        fallback={<div className="h-48 animate-pulse rounded-lg bg-gray-100" />}
      >
        <RestaurantReviews
          restaurantId={restaurantId}
          currentUserId={user?.id}
        />
      </Suspense>

      <Suspense
        fallback={<div className="h-24 animate-pulse rounded-lg bg-gray-100" />}
      >
        <RestaurantSection />
      </Suspense>
    </div>
  );
}
