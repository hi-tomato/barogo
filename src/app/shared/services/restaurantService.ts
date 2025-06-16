import {
  CreateRestaurantRequest,
  RestaurantDetail,
  RestaurantList,
} from "../types/restaurant";
import { get, post } from "../api/client";

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
  //TODO: 상세페이지 (수정)
  updateRestaurant: () => {},

  // TODO: 상세페이지 (삭제)
  deleteRestaurant: () => {},
};
