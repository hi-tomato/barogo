'use client';
import { useParams } from 'next/navigation';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { RestaurantImage } from '@/app/features/search/components/detail/RestaurantImages';
import { StateDisplay } from '@/app/shared/ui';
import dynamic from 'next/dynamic';

const RestaurantInfo = dynamic(
  () => import('@/app/features/search/components/detail/RestaurantInfo'),
  {
    ssr: false,
  }
);

const RestaurantReviews = dynamic(
  () => import('@/app/features/reviews/RestaurantReviews'),
  {
    ssr: false,
  }
);

const RestaurantSection = dynamic(
  () => import('@/app/features/search/components/detail/RestaurantSection'),
  {
    ssr: false,
  }
);

export default function RestaurantDetailPage() {
  const params = useParams<{ restaurantId: string }>();
  const { user } = useAuthStore();
  const restaurantId = params.restaurantId;

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
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />
      <RestaurantReviews restaurantId={restaurantId} currentUserId={user?.id} />
      <RestaurantSection />
    </div>
  );
}
