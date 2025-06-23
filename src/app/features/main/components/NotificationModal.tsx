"use client";
import { useNotification } from "@/app/shared/hooks/queries/useNotification";
import { Notification } from "@/app/shared/types/notification";
import { useRouter } from "next/navigation";
import React from "react";
import { HiBell, HiX } from "react-icons/hi";
import { formatTime } from "@/app/features/main/util/formatTime";

export default function NotificationModal({
  setIsNotificationOpen,
}: {
  setIsNotificationOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const { isLoading, notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotification();

  const handleMarkAsRead = async (notificationId: number) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-[#0000003c]"
        onClick={() => setIsNotificationOpen(false)}
      />
      {/* 알림 패널 */}
      <div className="relative w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
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
              className="p-1 hover:bg-gray-100 rounded"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>
        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <HiBell size={48} className="mb-2 opacity-50" />
              <p>새로운 알림이 없습니다</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.slice(0, 10).map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    notification.isRead
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-blue-50 hover:bg-blue-100"
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          notification.isRead
                            ? "text-gray-600"
                            : "text-gray-900 font-medium"
                        }`}
                      >
                        {notification.message}
                      </p>
                      {notification.restaurant && (
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.restaurant.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 푸터 */}
        {notifications.length > 10 && (
          <div className="p-4 border-t">
            <button
              onClick={() => {
                setIsNotificationOpen(false);
                router.push("/notifications");
              }}
              className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              모든 알림 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
