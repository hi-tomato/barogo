import {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  RestaurantDetail,
  RestaurantList,
  ReviewResponse,
  SearchQueries,
  UpdateRestaurantRequest,
} from '@/app/shared/types/restaurant';
import { apiClient } from '@/app/shared/api/client';

export class RestaurantService {
  // 맛집 검색
  async search(query?: SearchQueries): Promise<RestaurantList> {
    if (!query || Object.keys(query).length === 0) {
      return await apiClient.get<RestaurantList>('/restaurants');
    }

    const entries = Object.entries(query);
    const queries = entries
      .filter(([_, value]) => value !== '')
      .map(([keys, value]) => `${keys}=${value}`)
      .join('&');

    return await apiClient.get<RestaurantList>(
      `/restaurants${queries ? `?${queries}` : ''}`
    );
  }

  // 맛집 생성
  async create(
    restaurantData: CreateRestaurantRequest
  ): Promise<CreateRestaurantResponse> {
    return await apiClient.post<CreateRestaurantResponse>(
      '/restaurants',
      restaurantData
    );
  }

  // 맛집 상세 조회
  async getDetail(restaurantId: number): Promise<RestaurantDetail> {
    return await apiClient.get<RestaurantDetail>(
      `/restaurants/${restaurantId}`
    );
  }

  // 맛집 수정
  async update(
    restaurantId: number,
    updateData: UpdateRestaurantRequest
  ): Promise<RestaurantDetail> {
    return await apiClient.patch<RestaurantDetail>(
      `/restaurants/${restaurantId}`,
      updateData
    );
  }

  // 맛집 삭제
  async delete(restaurantId: number): Promise<void> {
    return await apiClient.delete<void>(`/restaurants/${restaurantId}`);
  }

  // 리뷰 목록 조회
  async getReviews(restaurantId: number): Promise<ReviewResponse> {
    return await apiClient.get<ReviewResponse>(
      `/restaurants/${restaurantId}/reviews`
    );
  }

  // 리뷰 생성
  async createReview(
    restaurantId: number,
    reviewData: CreateReviewRequest
  ): Promise<CreateReviewResponse> {
    return await apiClient.post<CreateReviewResponse>(
      `/restaurants/${restaurantId}/reviews`,
      reviewData
    );
  }

  // 리뷰 조회
  async getReview(reviewId: number): Promise<CreateReviewResponse> {
    return await apiClient.get<CreateReviewResponse>(
      `/restaurants/reviews/${reviewId}`
    );
  }

  // 리뷰 수정
  async updateReview(
    reviewId: number,
    reviewData: CreateReviewRequest
  ): Promise<CreateReviewResponse> {
    return await apiClient.patch<CreateReviewResponse>(
      `/restaurants/reviews/${reviewId}`,
      reviewData
    );
  }

  // 리뷰 삭제
  async deleteReview(reviewId: number): Promise<void> {
    return await apiClient.delete<void>(`/restaurants/reviews/${reviewId}`);
  }

  // 북마크 추가
  async addBookmark(restaurantId: number): Promise<void> {
    return await apiClient.post<void>(`/restaurants/${restaurantId}/bookmark`);
  }

  // 북마크 제거
  async removeBookmark(restaurantId: number): Promise<void> {
    return await apiClient.delete<void>(
      `/restaurants/${restaurantId}/bookmark`
    );
  }

  // 북마크 목록 조회
  async getBookMarkList(): Promise<RestaurantList> {
    return await apiClient.get<RestaurantList>(`/restaurants/me/bookmarks`);
  }
}

// 싱글톤 인스턴스 생성
export const restaurantService = new RestaurantService();
