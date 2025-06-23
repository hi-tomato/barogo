import { useCallback, useEffect, useState } from "react";
import { getAccessToken } from "../../lib/authToken";
import { notificationsServices } from "../../services/notificationsServices";
import { Notification } from "../../types/notification";

export const useNotification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const userToken = getAccessToken();

  const fetchNotifications = useCallback(async () => {
    if (!userToken) {
      return;
    }
    setIsLoading(true);

    try {
      const { data = [] } = await notificationsServices.get({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    } catch (error) {
      console.error("알림 조회 실패하였습니다", error);
    } finally {
      setIsLoading(false);
    }
  }, [userToken]);

  const setUpSSE = useCallback(() => {
    if (!userToken) return;

    setEventSource((prev) => {
      if (prev) {
        prev.close();
      }

      const newEventSource = new EventSource(
        `/api/notifications/stream?token=${userToken}`
      );

      newEventSource.onmessage = (e) => {
        try {
          const notification = JSON.parse(e.data);
          setNotifications((prev) => [notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } catch (error) {
          console.error("알림 데이터 파싱 실패:", error);
        }
      };

      newEventSource.onerror = (e) => {
        console.error("SSE 서버가 준비되지 않음");
        newEventSource.close();
        return null;
      };

      return newEventSource;
    });
  }, [userToken]);

  const markAsRead = useCallback(
    async (notificationId: number) => {
      if (!userToken) return;
      try {
        await notificationsServices.post(notificationId);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error("알림 읽음 처리 실패:", error);
      }
    },
    [userToken]
  );

  const markAllAsRead = useCallback(async () => {
    if (!userToken) return;

    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);

      await Promise.all(
        unreadNotifications.map((n) => notificationsServices.post(n.id))
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("모든 알림 읽음 처리 실패:", error);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  }, [userToken, notifications]);

  useEffect(() => {
    if (userToken) {
      fetchNotifications();
      if (process.env.NODE_ENV === "production") {
        setUpSSE();
      }
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userToken]);

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
};
