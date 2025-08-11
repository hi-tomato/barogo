import { useCallback, useEffect, useState, useRef } from 'react';
import { getAccessToken } from '@/app/shared/lib/authToken';
import { notificationsServices } from '../../services/notificationsServices';
import { Notification } from '@/app/shared/types/notification';

export const useNotification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sseError, setSseError] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef(0);
  const isFetchingRef = useRef(false);
  const maxRetries = 3;

  const userToken = getAccessToken();

  const fetchNotifications = useCallback(async () => {
    if (!userToken) {
      console.log('알림 조회: 토큰이 없습니다');
      return;
    }

    if (isFetchingRef.current) {
      console.log('알림 조회: 이미 요청 중입니다');
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      console.log('알림 조회 시작:', process.env.NEXT_PUBLIC_API_URL);
      const response = await notificationsServices.get({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = Array.isArray(response) ? response : [];
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
      console.log('알림 조회 성공:', data.length);
    } catch (error) {
      console.error('알림 조회 실패하였습니다', error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [userToken]);

  const closeEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const setUpSSE = useCallback(() => {
    if (!userToken) return;

    // 프로덕션 환경에서만 SSE 설정
    if (process.env.NODE_ENV !== 'production') {
      console.log('개발 환경: SSE 비활성화');
      return;
    }

    if (retryCountRef.current >= maxRetries) {
      console.log('SSE 최대 재시도 횟수 초과, SSE 비활성화');
      setSseError(true);
      return;
    }

    closeEventSource();

    try {
      console.log(`SSE 연결 시도 ${retryCountRef.current + 1}/${maxRetries}`);
      const newEventSource = new EventSource(
        `/api/notifications/stream?token=${userToken}`
      );

      newEventSource.onopen = () => {
        console.log('SSE 연결 성공');
        retryCountRef.current = 0; // 연결 성공 시 재시도 카운트 리셋
        setSseError(false);
      };

      newEventSource.onmessage = (e) => {
        try {
          const notification = JSON.parse(e.data);
          setNotifications((prev) => [notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        } catch (error) {
          console.error('알림 데이터 파싱 실패:', error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error('SSE 연결 오류:', error);
        newEventSource.close();
        retryCountRef.current += 1;

        // 3초 후 재시도
        setTimeout(() => {
          if (retryCountRef.current < maxRetries) {
            setUpSSE();
          } else {
            setSseError(true);
          }
        }, 3000);
      };

      // ref에 새 연결 저장
      eventSourceRef.current = newEventSource;
    } catch (error) {
      console.error('SSE 설정 실패:', error);
      retryCountRef.current += 1;
    }
  }, [userToken, closeEventSource]);

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
        console.error('알림 읽음 처리 실패:', error);
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
      console.error('모든 알림 읽음 처리 실패:', error);
      // 에러가 발생해도 UI는 업데이트
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  }, [userToken, notifications]);

  // SSE 재연결 함수
  const reconnectSSE = useCallback(() => {
    retryCountRef.current = 0;
    setSseError(false);
    setUpSSE();
  }, [setUpSSE]);

  // 메인 useEffect - userToken이 변경될 때만 실행
  useEffect(() => {
    if (userToken) {
      // 초기 알림 로드
      fetchNotifications();

      // 프로덕션 환경에서만 SSE 설정
      if (process.env.NODE_ENV === 'production') {
        setUpSSE();
      }
    }

    // cleanup 함수
    return () => {
      closeEventSource();
    };
  }, [userToken, fetchNotifications, setUpSSE, closeEventSource]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
    sseError,
    reconnectSSE,
  };
};
