'use client';
import { useNotification } from '@/app/shared/hooks/queries/useNotification';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { HiSearch, HiBell } from 'react-icons/hi';
import { Input } from '@/app/shared/ui';
import NotificationModal from './NotificationModal';

export default function MainHeader() {
  const router = useRouter();
  const { unreadCount, isLoading } = useNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationClick = useCallback(
    () => setIsNotificationOpen(!isNotificationOpen),
    [isNotificationOpen]
  );

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C4E80]">
          <span className="text-lg font-bold text-white">B</span>
        </div>

        {/* 검색바 */}
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="무료 주차 맛집을 찾아보세요!"
            leftIcon={<HiSearch className="text-[#8A8A8A]" size={20} />}
            onClick={() => router.push('/search')}
            readOnly
            variant="search"
            fullWidth={false}
            className="bg-[#F5F5F5]"
          />
        </div>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-2">
          <button
            className="relative rounded-lg p-2 text-[#2B2B2B] transition-colors hover:bg-[#E6EEF5]"
            onClick={handleNotificationClick}
            title="알림"
          >
            <HiBell
              size={24}
              className={isLoading ? 'text-gray-400' : 'text-[#2B2B2B]'}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 알림 Toggle 모달 */}
      {isNotificationOpen && (
        <NotificationModal setIsNotificationOpen={setIsNotificationOpen} />
      )}
    </header>
  );
}
