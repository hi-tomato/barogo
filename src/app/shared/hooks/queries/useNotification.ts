import { useQuery } from "@tanstack/react-query";
import { notificationsServices } from "../../services/notificationsServices";
import { Notification } from "../../types/notification";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { getAccessToken } from "../../lib/authToken";

export const useNotification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const userToken = getAccessToken();
  const fetchNotifications = async (data: Notification[]) => {
    if (!userToken) {
      return null;
    }

    try {
      const response = await notificationsServices.get({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setNotifications(response.data || []);
      setUnreadCount(data.filter((n) => !n.isRead).length);
      return response;
    } catch (error) {
      console.error("알림 조회 실패:", error);
    }
  };
};
