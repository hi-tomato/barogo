'use client';
import { useParams } from 'next/navigation';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
// import RestaurantHeader from '@/app/features/search/components/detail/RestaurantHeader';
import RestaurantImages from '@/app/features/search/components/detail/RestaurantImages';
import RestaurantInfo from '@/app/features/search/components/detail/RestaurantInfo';
import RestaurantReviews from '@/app/features/reviews/RestaurantReviews';
import RestaurantSection from '@/app/features/search/components/detail/RestaurantSection';
// import RestaurantMap from '@/app/features/search/components/detail/RestaurantMap';
import { StateDisplay } from '@/app/shared/ui';

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
      <RestaurantImages images={restaurant.photos} />
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />
      <RestaurantReviews restaurantId={restaurantId} currentUserId={user?.id} />
      <RestaurantSection />
    </div>
  );
}
