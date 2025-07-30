import { restaurantService } from '@/app/shared/services/restaurantService';
import { Metadata } from 'next';
import RestaurantDetailClient from '@/app/features/restaurant/components/RestaurantDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}): Promise<Metadata> {
  try {
    const { restaurantId } = await params;
    const restaurant = await restaurantService.getDetail(Number(restaurantId));

    if (!restaurant) {
      return {
        title: '해당 맛집을 찾을 수 없습니다.',
        description: '요청하신 맛집을 찾을 수 없습니다.',
      };
    }

    return {
      title: `${restaurant.name} | Barogo`,
      description: `${restaurant.name} - ${restaurant.address}. ${restaurant.description || '맛있는 음식을 즐겨보세요!'}`,
      keywords: `${restaurant.name}, ${restaurant.category}, 맛집, ${restaurant.address}`,
      openGraph: {
        title: `${restaurant.name} | Barogo`,
        description:
          restaurant.description ||
          `${restaurant.name}에서 맛있는 음식을 즐겨보세요!`,
        images: restaurant.photos?.[0] ? [restaurant.photos[0]] : [],
      },
    };
  } catch (_: unknown) {
    return {
      title: '해당 맛집을 찾을 수 없습니다.',
      description: '요청하신 맛집을 찾을 수 없습니다.',
    };
  }
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  return <RestaurantDetailClient restaurantId={restaurantId} />;
}
