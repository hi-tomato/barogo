import {
  CreateRestaurantRequest,
  CreateReviewRequest,
  CreateReviewResponse,
  RestaurantDetail,
  RestaurantList,
  ReviewResponse,
  SearchQueries,
  UpdateRestaurantRequest,
} from "../types/restaurant";
import { del, get, patch, post } from "../api/client";

export const restaurantService = {
  search: async (query?: SearchQueries): Promise<RestaurantList> => {
    if (!query || Object.keys(query).length === 0) {
      const { data } = await get<RestaurantList>("/restaurants");
      console.log("restaurantService: ", data);
      return data;
    }

    const entries = Object.entries(query);
    const queries = entries
      .filter(([_, value]) => value !== "")
      .map(([keys, value]) => `${keys}=${value}`)
      .join("&");

    const { data } = await get<RestaurantList>(
      `/restaurants${queries ? `?${queries}` : ""}`
    );
    return data;
  },

  create: async (
    restaurantData: CreateRestaurantRequest
  ): Promise<RestaurantDetail> => {
    const { data } = await post<RestaurantDetail>(
      `/restaurants`,
      restaurantData
    );
    return data;
  },

  getDetail: async (restaurantId: string): Promise<RestaurantDetail> => {
    const { data } = await get<RestaurantDetail>(
      `/restaurants/${restaurantId}`
    );
    return data;
  },

  update: async (
    restaurantId: string,
    updateData: UpdateRestaurantRequest
  ): Promise<RestaurantDetail> => {
    const { data } = await patch<RestaurantDetail>(
      `/restaurants/${restaurantId}`,
      updateData
    );
    return data;
  },

  delete: async (restaurantId: string): Promise<void> => {
    await del(`/restaurants/${restaurantId}`);
  },

  getReviews: async (restaurantId: string): Promise<ReviewResponse> => {
    const { data } = await get<ReviewResponse>(
      `/restaurants/${restaurantId}/reviews`
    );
    return data;
  },

  createReview: async (
    restaurantId: string,
    reviewData: CreateReviewRequest
  ): Promise<CreateReviewResponse> => {
    const { data } = await post<CreateReviewResponse>(
      `/restaurants/${restaurantId}/reviews`,
      reviewData
    );
    return data;
  },

  getReview: async (reviewId: string): Promise<CreateReviewResponse> => {
    const { data } = await get<CreateReviewResponse>(
      `/restaurants/reviews/${reviewId}`
    );
    return data;
  },

  updateReview: async (
    reviewId: string,
    reviewData: CreateReviewRequest
  ): Promise<CreateReviewResponse> => {
    const { data } = await patch<CreateReviewResponse>(
      `/restaurants/reviews/${reviewId}`,
      reviewData
    );
    return data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await del(`/restaurants/reviews/${reviewId}`);
  },

  addBookmark: async (restaurantId: number): Promise<void> => {
    const { data } = await post(`/restaurants/${restaurantId}/bookmark`);
    console.log(restaurantId);
    return data;
  },

  removeBookmark: async (restaurantId: number): Promise<void> => {
    await del(`/restaurants/${restaurantId}/bookmark`);
  },

  getBookMarkList: async (): Promise<RestaurantList> => {
    const { data } = await get<RestaurantList>(`/restaurants/me/bookmarks`);
    console.log(`북마크 리스트 ${data}`);
    return data;
  },
};
