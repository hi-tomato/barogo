'use client';
import RestaurantHeader from '../components/detail/RestaurantHeader';
import RestaurantInfo from '../components/detail/RestaurantInfo';
import RestaurantReviews from '../../reviews/RestaurantReviews';
import RestaurantSection from '../components/detail/RestaurantSection';
import RestaurantMap from '../components/detail/RestaurantMap';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { RestaurantImages } from '../components/detail/RestaurantImages';

export default function SearchDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError,
  } = useRestaurantDetail(Number(params.id));

  if (restaurantLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#1C4E80]"></div>
          <p className="text-[#1C4E80]">맛집 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
        <div className="space-y-4 text-center">
          <p className="text-lg text-red-500">
            맛집 정보를 불러올 수 없습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#1C4E80] px-4 py-2 text-white transition-colors hover:bg-[#154066]"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantImages
        restaurantId={Number(restaurant.id)}
        images={restaurant.photos}
      />
      <RestaurantInfo
        restaurant={restaurant}
        isOwner={restaurant.isWrittenByMe}
      />
      <RestaurantReviews
        restaurantId={restaurant.id}
        currentUserId={user?.id}
      />
      <RestaurantSection />
      <RestaurantMap />
    </div>
  );
}
