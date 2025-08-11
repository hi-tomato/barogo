'use client';
import { useNotification } from '@/app/shared/hooks/queries/useNotification';
import { Notification } from '@/app/shared/types/notification';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import {
  HiBell,
  HiX,
  HiRefresh,
  HiWifi,
  HiExclamationCircle,
} from 'react-icons/hi';
import { formatTime } from '@/app/features/main/util/formatTime';

export default function NotificationModal({
  setIsNotificationOpen,
}: {
  setIsNotificationOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const {
    isLoading,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch,
    sseError,
    reconnectSSE,
  } = useNotification();
  const [hasError, setHasError] = useState(false);

  const handleMarkAsRead = useCallback(
    async (notificationId: number) => {
      try {
        await markAsRead(notificationId);
      } catch (error) {
        console.error('알림 읽음 처리 실패:', error);
      }
    },
    [markAsRead]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('모든 알림 읽음 처리 실패:', error);
    }
  }, [markAllAsRead]);

  const handleRetry = useCallback(async () => {
    setHasError(false);
    try {
      await refetch();
    } catch (error) {
      console.error('알림 재시도 실패:', error);
      setHasError(true);
    }
  }, [refetch]);

  const handleReconnectSSE = useCallback(() => {
    reconnectSSE();
  }, [reconnectSSE]);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">알림</h2>
            {sseError && (
              <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                <HiExclamationCircle size={12} />
                <span>실시간 연결 끊김</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasError && (
              <button
                onClick={handleRetry}
                className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100"
                title="새로고침"
              >
                <HiRefresh size={20} />
              </button>
            )}
            {sseError && (
              <button
                onClick={handleReconnectSSE}
                className="rounded-lg p-1 text-blue-500 transition-colors hover:bg-blue-100"
                title="실시간 연결 재시도"
              >
                <HiWifi size={20} />
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100"
            >
              <HiX size={24} />
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : hasError ? (
            <div className="flex h-32 flex-col items-center justify-center text-gray-500">
              <HiBell size={48} className="mb-2 opacity-50" />
              <p className="mb-2">알림을 불러올 수 없습니다</p>
              <button
                onClick={handleRetry}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center text-gray-500">
              <HiBell size={48} className="mb-2 opacity-50" />
              <p>새로운 알림이 없습니다</p>
              {sseError && (
                <p className="mt-2 text-xs text-yellow-600">
                  실시간 알림이 비활성화되었습니다
                </p>
              )}
            </div>
          ) : (
            <div className="p-2">
              {notifications.slice(0, 10).map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={`mb-2 cursor-pointer rounded-lg p-3 transition-colors ${
                    notification.isRead
                      ? 'bg-gray-50 hover:bg-gray-100'
                      : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          notification.isRead
                            ? 'text-gray-600'
                            : 'font-medium text-gray-900'
                        }`}
                      >
                        {notification.message}
                      </p>
                      {notification.restaurant && (
                        <p className="mt-1 text-xs text-gray-500">
                          {notification.restaurant.name}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 푸터 */}
        {notifications.length > 10 && (
          <div className="border-t p-4">
            <button
              onClick={() => {
                setIsNotificationOpen(false);
                router.push('/notifications');
              }}
              className="w-full rounded-lg py-2 text-center text-blue-600 transition-colors hover:bg-blue-50"
            >
              모든 알림 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
