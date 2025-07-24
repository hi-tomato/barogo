'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RestaurantDetail } from '@/app/shared/types/restaurant';
import { HiInformationCircle, HiLocationMarker } from 'react-icons/hi';
import BasicInfoTab from './tabs/BasicInfoTab';
import LocationTab from './tabs/LocationTab';

interface RestaurantDetailsProps {
  restaurant: RestaurantDetail;
}

type TabType = 'basic' | 'location';

const tabs = [
  { id: 'basic', label: '기본정보', icon: HiInformationCircle },
  { id: 'location', label: '위치', icon: HiLocationMarker },
] as const;

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab restaurant={restaurant} />;
      case 'location':
        return <LocationTab restaurant={restaurant} />;
      default:
        return <BasicInfoTab restaurant={restaurant} />;
    }
  }, [activeTab, restaurant]);

  return (
    <div className="px-4">
      {/* 탭 네비게이션 */}
      <div className="mb-6">
        <div className="flex space-x-1 rounded-2xl bg-gray-100 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">{renderContent}</AnimatePresence>
    </div>
  );
}
