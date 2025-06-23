import { get, post } from "../api/client";

export const notificationsServices = {
  getStream: async () => {
    const response = await get("/notifications/stream");
    return response;
  },
  get: async (config?: { headers?: Record<string, string> }) => {
    const response = await get("/notifications", config);
    return response;
  },
  post: async (id: number) => {
    const response = await post(`/notifications/${id}/read`);
    return response;
  },
};
