import {
  CreateRestaurantRequest,
  CreateReviewRequest,
  CreateReviewResponse,
  RestaurantDetail,
  RestaurantList,
  ReviewResponse,
  UpdateRestaurantRequest,
} from "../types/restaurant";
import { del, get, patch, post } from "../api/client";

export const restaurantService = {
  getList: async (): Promise<RestaurantList> => {
    const { data } = await get<RestaurantList>(`/restaurants`);
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

  addBookmark: async (restaurantId: string): Promise<void> => {
    const { data } = await post(`/restaurants/${restaurantId}/bookmark`);
    return data;
  },

  removeBookmark: async (restaurantId: string): Promise<void> => {
    await del(`/restaurants/${restaurantId}/bookmark`);
  },
};
