import { Location, NearbyRestaurant } from "@/app/shared/types";

export const kakaoApiService = {
  getNearbyRestaurants: async (
    location: Location
  ): Promise<NearbyRestaurant[]> => {
    const response = await fetch(
      `/api/nearby-restaurants?lat=${location.latitude}&lng=${location.longitude}`
    );

    if (!response.ok) {
      throw new Error("주변 맛집 정보를 불러오는데 실패했습니다");
    }

    const data = await response.json();
    return data.documents || [];
  },
};
