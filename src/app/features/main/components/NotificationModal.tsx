'use client';
import { useNotification } from '@/app/shared/hooks/queries/useNotification';
import { Notification } from '@/app/shared/types/notification';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { HiBell, HiX } from 'react-icons/hi';
import { formatTime } from '@/app/features/main/util/formatTime';

export default function NotificationModal({
  setIsNotificationOpen,
}: {
  setIsNotificationOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const { isLoading, notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotification();

  const handleMarkAsRead = useCallback(
    async (notificationId: number) => {
      await markAsRead(notificationId);
    },
    [markAsRead]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    await markAllAsRead();
  }, [markAllAsRead]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-[#0000003c]"
        onClick={() => setIsNotificationOpen(false)}
      />
      {/* 알림 패널 */}
      <div className="relative flex h-full w-80 transform flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">알림</h2>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                모두 읽기
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>
        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center text-gray-500">
              <HiBell size={48} className="mb-2 opacity-50" />
              <p>새로운 알림이 없습니다</p>
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
