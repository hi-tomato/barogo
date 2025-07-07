// import { get, patch, post } from '../api/client';

import {
  BaropotsQueries,
  CreateBaropotRequest,
  BaropotListResponse,
  JoinBaropotRequest,
  BaropotDetailResponse,
  BaropotEditRequest,
  ManageParticipantRequest,
} from '@/app/shared/types/baropots';
import { BaropotStatus } from '../types/enums';
import { apiClient } from '../api/client';

export class BaropotService {
  /** 유저가 참여할 수 있는 바로팟 목록 조회 */
  async getList(queries?: BaropotsQueries): Promise<BaropotListResponse[]> {
    if (!queries) {
      return await apiClient.get<BaropotListResponse[]>(`/baropots`);
    }

    const entries = Object.entries(queries);
    const queryString = entries
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return await apiClient.get<BaropotListResponse[]>(
      `/baropots?${queryString}`
    );
  }

  /** 유저가 검색한 바로팟 목록 조회 (ID) */
  async getBaropotByRestaurant(
    restaurantID: number
  ): Promise<BaropotListResponse[]> {
    return await apiClient.get<BaropotListResponse[]>(
      `/baropots?restaurantId=${restaurantID}&status=RECRUITING`
    );
  }

  /** 바로팟 생성 */
  async createBaropot(
    baropotData: CreateBaropotRequest
  ): Promise<BaropotListResponse> {
    return await apiClient.post<BaropotListResponse>(`/baropots`, baropotData);
  }

  /** 유저 전용: 바로팟 참여 */
  async joinBaropot(
    baropotId: number,
    message: JoinBaropotRequest
  ): Promise<BaropotListResponse> {
    return await apiClient.post<BaropotListResponse>(
      `/baropots/${baropotId}/participants`,
      message
    );
  }

  /** 바로팟 상세 조회 */
  async getDetail(baropotId: number): Promise<BaropotDetailResponse> {
    return await apiClient.get<BaropotDetailResponse>(`/baropots/${baropotId}`);
  }

  /** 바로팟 내용 수정 */
  async updateBaropot(
    baropotId: number,
    baropotData: BaropotEditRequest
  ): Promise<BaropotDetailResponse> {
    return await apiClient.patch<BaropotDetailResponse>(
      `/baropots/${baropotId}`,
      baropotData
    );
  }

  /** (Host) 바로팟 참가 요청 처리  */
  async mangeParticipant(
    baropotId: number,
    baropotData: ManageParticipantRequest
  ): Promise<BaropotDetailResponse> {
    return await apiClient.patch<BaropotDetailResponse>(
      `/baropots/${baropotId}/participants`,
      baropotData
    );
  }

  /** (Host) 바로팟 상태 변경 */
  async updateStatus(
    baropotId: number,
    statusData: { status: BaropotStatus }
  ): Promise<BaropotDetailResponse> {
    return await apiClient.patch<BaropotDetailResponse>(
      `/baropots/${baropotId}/status`,
      statusData
    );
  }

  /** (Host) 바로팟 전체 목록 리스트 조회 */
  async getHostList(queries?: BaropotsQueries): Promise<BaropotListResponse[]> {
    const baseUrl = `/baropots/me`;

    const queryString = queries
      ? Object.entries(queries)
          .filter(
            ([_, value]) =>
              value !== '' &&
              value != null &&
              value !== undefined &&
              value !== 0
          )
          .map(([key, value]) => {
            if (key === 'statusList') {
              return `${key}[]=${encodeURIComponent(value)}`;
            }
            return `${key}=${encodeURIComponent(value)}`;
          })
          .join('&')
      : '';

    const url =
      queries && Object.keys(queries).length > 0 && queryString
        ? `${baseUrl}?${queryString}`
        : baseUrl;

    return await apiClient.get<BaropotListResponse[]>(url);
  }
}

// 싱글톤 인스턴스 생성
export const baropotService = new BaropotService();
