'use client';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { StateDisplay } from '@/app/shared/ui';
import dynamic from 'next/dynamic';

const RestaurantImages = dynamic(
  () => import('@/app/features/search/components/detail/RestaurantImages'),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
    ),
  }
);

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
  restaurantId: number;
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
      <RestaurantImages
        restaurantId={restaurantId}
        images={restaurant.photos}
      />
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />

      <RestaurantReviews restaurantId={restaurantId} currentUserId={user?.id} />

      <RestaurantSection />
    </div>
  );
}
