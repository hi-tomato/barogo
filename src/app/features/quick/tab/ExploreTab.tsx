'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import { HiMapPin } from 'react-icons/hi2';

const exploreOptions = [
  {
    id: 'search',
    title: '맛집 검색',
    description: '이름으로 맛집 찾기',
    icon: <HiSearch className="text-blue-500" size={20} />,
    path: '/search',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'nearby',
    title: '주변 맛집',
    description: '현재 위치 기준 탐색',
    icon: <HiMapPin className="text-green-500" size={20} />,
    path: '/nearby',
    color: 'bg-green-50 border-green-200',
  },
];

export default function ExploreTab() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* 주요 검색 옵션 */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#2B2B2B]">
          맛집 찾기
        </h3>
        <div className="space-y-3">
          {exploreOptions.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(option.path)}
              className={`w-full rounded-lg border p-4 text-left transition-all hover:shadow-md ${option.color}`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{option.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{option.title}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 검색 팁 */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">💡 검색 팁</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>
            • 지역명 + 맛집명으로 검색하면 더 정확한 결과를 얻을 수 있어요
          </li>
          <li>• 등록된 맛집이라면, 파티원을 구할 수 있어요</li>
          <li>• 현재 맛집과 같은 지역에 있는 맛집을 찾을 수 있어요</li>
        </ul>
      </div>
    </div>
  );
}
