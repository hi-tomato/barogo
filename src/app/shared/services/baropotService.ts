import { get, post } from "../api/client";

import {
  BaropotsQueries,
  CreateBaropotRequest,
  BaropotListResponse,
} from "@/app/shared/types/baropots";

export const baropotService = {
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
  createBaropot: async (baropotData: CreateBaropotRequest) => {
    const { data } = await post<BaropotListResponse>(`/baropots`, baropotData);
    return data;
  },
};
