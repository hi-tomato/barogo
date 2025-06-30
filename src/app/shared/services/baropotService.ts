import { get, patch, post } from "../api/client";

import {
  BaropotsQueries,
  CreateBaropotRequest,
  BaropotListResponse,
  JoinBaropotRequest,
  BaropotDetailResponse,
  BaropotEditRequest,
  UpdateBaropotStatusRequest,
  ManageParticipantRequest,
} from "@/app/shared/types/baropots";

export const baropotService = {
  /** 유저가 참여할 수 있는 바로팟 목록 조회 */
  getList: async (queries?: BaropotsQueries) => {
    if (!queries) {
      const { data } = await get<BaropotListResponse[]>(`/baropots`);
      return data;
    }
    if (queries) {
      const entries = Object.entries(queries);
      const queryString = entries
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const { data } = await get<BaropotListResponse[]>(
        `/baropots?${queryString}`
      );
      return data;
    }
  },
  /** 바로팟 생성 */
  createBaropot: async (baropotData: CreateBaropotRequest) => {
    const { data } = await post<BaropotListResponse>(`/baropots`, baropotData);
    return data;
  },
  /** 유저 전용: 바로팟 참여 */
  joinBaropot: async (baropotId: number, message: JoinBaropotRequest) => {
    const { data } = await post<BaropotListResponse>(
      `/baropots/${baropotId}/participants`,
      message
    );
    return data;
  },
  /** 바로팟 상세 조회 */
  getDetail: async (baropotId: number) => {
    const { data } = await get<BaropotDetailResponse>(`/baropots/${baropotId}`);
    return data;
  },
  /** 바로팟 내용 수정 */
  updateBaropot: async (baropotId: number, baropotData: BaropotEditRequest) => {
    const { data } = await patch<BaropotDetailResponse>(
      `/baropots/${baropotId}`,
      baropotData
    );
    return data;
  },
  /** (Host) 바로팟 참가 요청 처리  */
  mangeParticipant: async (
    baropotId: number,
    baropotData: ManageParticipantRequest
  ) => {
    const { data } = await patch<BaropotDetailResponse>(
      `/baropots/${baropotId}/participants`,
      baropotData
    );
    return data;
  },
  /** (Host) 바로팟 상태 변경 */
  updateStatus: async (
    baropotId: number,
    statusData: UpdateBaropotStatusRequest
  ) => {
    const { data } = await patch<BaropotDetailResponse>(
      `/baropots/${baropotId}/status`,
      statusData
    );
    return data;
  },
  /** (Host) 바로팟 전체 목록 리스트 조회 */
  getHostList: async (queries?: BaropotsQueries) => {
    if (!queries) {
      const { data } = await get<BaropotListResponse[]>(`/baropots/me`);
      return data;
    }
    if (queries) {
      const entries = Object.entries(queries);
      const queryString = entries
        .filter(
          ([_, value]) =>
            value !== "" && value != null && value !== undefined && value !== 0
        )
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const { data } = await get<BaropotListResponse[]>(
        `/baropots/me?${queryString}`
      );
      return data;
    }
  },
};
