'use client';
import { useState } from 'react';
import MyPageHeader from './MyPageHeader';
import ProfileSection from './ProfileSection';
import MenuGrid from './MenuGrid';
import RecentActivity from './RecentActivity';
import LogoutSection from './LogoutSection';

const menuItems = [
  {
    id: 'my-reviews',
    title: '내 리뷰',
    icon: '📝',
    path: '/mypage/reviews',
  },
  {
    id: 'baropot',
    title: '바로팟',
    icon: '⚡',
    path: '/mypage/baropot',
  },
  {
    id: 'bookmarks',
    title: '찜한곳',
    icon: '💙',
    path: '/mypage/bookmarks',
  },
  {
    id: 'visited',
    title: '방문기록(지도)',
    icon: '📍',
    path: '/mypage/visited',
  },
  {
    id: 'settings',
    title: '설정',
    icon: '⚙️',
    path: '/mypage/settings',
  },
  {
    id: 'history',
    title: '히스토리',
    icon: '📊',
    path: '/mypage/history',
  },
];

const recentActivities = [
  {
    id: '1',
    icon: '⚡',
    iconBgColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    title: '홍대 맛집 바로팟에 참여했어요',
    time: '2시간 전',
  },
  {
    id: '2',
    icon: '📝',
    iconBgColor: 'bg-orange-100',
    iconTextColor: 'text-orange-600',
    title: '석압생소금구이 리뷰를 작성했어요',
    time: '1일 전',
  },
  {
    id: '3',
    icon: '💙',
    iconBgColor: 'bg-red-100',
    iconTextColor: 'text-red-600',
    title: '홀리스 타코를 찜했어요',
    time: '3일 전',
  },
];

export default function MyPageContainer() {
  const [userStats] = useState({
    reviews: 12,
    baropots: 12,
    bookmarks: 12,
  });

  return (
    <>
      <MyPageHeader />
      <div className="space-y-6 px-4 py-6">
        <ProfileSection userStats={userStats} />
        <MenuGrid menuItems={menuItems} />
        <RecentActivity activities={recentActivities} />
        <LogoutSection />
      </div>
    </>
  );
}
