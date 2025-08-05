'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/shared/ui';
import { FaFire, FaHeart, FaSearch, FaStar } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { HiFire, HiMap } from 'react-icons/hi';
import ExploreTab from '@/app/features/quick/tab/ExploreTab';
import FavoriteTab from '@/app/features/quick/tab/FavoriteTab';
import PopularTab from '@/app/features/quick/tab/PopularTab';
import LikedTab from '@/app/features/quick/tab/LikedTab';
import FloatingBanner from '@/app/features/quick/FloatingBanner';

type ActiveTab = 'explore' | 'favorite' | 'popular' | 'liked';
const tabs = [
  { id: 'explore', label: '탐색', icon: <FaSearch /> },
  { id: 'favorite', label: '즐겨찾기', icon: <FaStar /> },
  { id: 'popular', label: '인기', icon: <FaFire /> },
  { id: 'liked', label: '좋아요', icon: <FaHeart /> },
] as const;

export default function RestaurantsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case 'explore':
        return <ExploreTab />;
      case 'favorite':
        return <FavoriteTab />;
      case 'popular':
        return <PopularTab />;
      case 'liked':
        return <LikedTab />;
      default:
        return <ExploreTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#E6EEF5] pt-0 pb-24">
      <Header title="바로팟 만들기" showBack={true} />

      <div className="space-y-6 p-4">
        <FloatingBanner />

        <div className="rounded-xl bg-white p-1 shadow-sm">
          <div className="flex">
            <AnimatePresence mode="popLayout">
              {tabs.map((tab) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#1C4E80] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#1C4E80]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/map')}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <HiMap className="text-[#1C4E80]" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#2B2B2B]">지도로 보기</h3>
                <p className="text-xs text-gray-500">주변 맛집 탐색</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/baropot/host')}
            className="rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <HiFire className="text-orange-600" size={20} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#2B2B2B]">바로팟 만들기</h3>
                <p className="text-xs text-gray-500">새로운 모임 시작</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <AnimatePresence mode="wait">{renderTabContent}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
