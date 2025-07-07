import { apiClient } from '../api/client';

export class NotificationsService {
  async getStream() {
    return await apiClient.get('/notifications/stream');
  }

  async get(config?: { headers?: Record<string, string> }) {
    return await apiClient.get('/notifications', config);
  }

  async post(id: number) {
    return await apiClient.post(`/notifications/${id}/read`);
  }
}

// 싱글톤 인스턴스 생성
export const notificationsServices = new NotificationsService();
