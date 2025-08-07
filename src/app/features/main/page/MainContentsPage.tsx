'use client';
import MainTabMenu from '@/app/features/main/components/MainTabMenu';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/app/shared/ui';

const LiveBaropotStatus = dynamic(
  () => import('@/app/features/main/components/LiveBaropotStatus'),
  {
    loading: () => <LoadingSpinner size="sm" />,
  }
);

const PopularRestaurants = dynamic(
  () => import('@/app/features/main/components/PopularRestaurants'),
  {
    loading: () => <LoadingSpinner size="sm" />,
  }
);

const CategoryExplorer = dynamic(
  () => import('@/app/features/main/components/CategoryExplorer'),
  {
    loading: () => <LoadingSpinner size="sm" />,
  }
);

const NewRestaurants = dynamic(
  () => import('@/app/features/main/components/NewRestaurants'),
  {
    loading: () => <LoadingSpinner size="sm" />,
  }
);

export default function MainContentsPage() {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-4">
      <MainTabMenu />
      <LiveBaropotStatus />
      <CategoryExplorer />
      <NewRestaurants />
      <PopularRestaurants />
    </div>
  );
}
