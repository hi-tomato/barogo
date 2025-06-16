import {
  CreateRestaurantRequest,
  RestaurantDetail,
  RestaurantList,
} from "../types/restaurant";
import { get, post } from "../api/client";
const BASE_URL = "http://localhost:8000";

export const restaurantService = {
  // TODO: 맛집 조회
  getList: async () => {
    const { data } = await get<RestaurantList>(`${BASE_URL}/restaurants`);
    return data;
  },
  // TODO: 맛집 등록
  create: async (restaurantData: CreateRestaurantRequest) => {
    const { data } = await post<CreateRestaurantRequest>(
      `${BASE_URL}/restaurants`,
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
};
