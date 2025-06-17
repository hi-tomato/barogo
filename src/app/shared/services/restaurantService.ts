import {
  CreateRestaurantRequest,
  RestaurantDetail,
  RestaurantList,
  UpdateRestaurantRequest,
} from "../types/restaurant";
import { del, get, patch, post } from "../api/client";

export const restaurantService = {
  // TODO: 맛집 조회
  getList: async () => {
    const { data } = await get<RestaurantList>(`/restaurants`);
    return data;
  },
  // TODO: 맛집 등록
  create: async (restaurantData: CreateRestaurantRequest) => {
    const { data } = await post<CreateRestaurantRequest>(
      `/restaurants`,
      restaurantData
    );
    return data;
  },
  //TODO: 맛집 상세 조회
  getDetail: async (restaurantId: string) => {
    const { data } = await get<RestaurantDetail>(
      `/restaurants/${restaurantId}`
    );
    return data;
  },
  // TODO:맛집 수정
  updateRestaurant: async (
    restaurantId: string,
    updateData: UpdateRestaurantRequest
  ): Promise<RestaurantDetail> => {
    const { data } = await patch<RestaurantDetail>(
      `/restaurants/${restaurantId}`,
      updateData
    );
    return data;
  },
  // TODO:맛집 삭제
  deleteRestaurant: async (restaurantId: string): Promise<void> => {
    await del(`/restaurants/${restaurantId}`);
  },
};
