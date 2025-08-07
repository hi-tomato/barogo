import Link from 'next/link';
import { BiCloudLightning } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';
import { BiMapPin } from 'react-icons/bi';
import { BiMap } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

const menuItems = [
  {
    href: '/nearby',
    icon: <BiMapPin size={26} />,
    title: '내 주변 맛집',
    description: '현재 기준으로 가까운 맛집',
    color: 'text-blue-500',
  },
  {
    href: '/popular',
    icon: <BiHeart size={26} />,
    title: '찜한 맛집',
    description: '저장해둔 맛집 리스트',
    color: 'text-pink-500',
  },
  {
    href: '/baropot',
    icon: <BiCloudLightning size={26} />,
    title: '바로팟 현황',
    description: '실시간 번개 모임',
    color: 'text-yellow-500',
  },
  {
    href: '/map',
    icon: <BiMap size={26} />,
    title: '지도 보기',
    description: '지도에서 맛집을 한눈에 확인',
    color: 'text-green-500',
  },
  {
    href: '/search',
    icon: <BiSearch size={26} />,
    title: '맛집 검색',
    description: '원하는 맛집을 검색',
    color: 'text-purple-500',
  },
];

export default function MainTabMenu() {
  return (
    <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-4">
      <h2 className="mb-3 flex items-center text-base font-semibold text-[#2B2B2B] sm:mb-4 sm:text-lg md:text-xl lg:text-lg">
        빠른 메뉴
      </h2>
      <div className="scrollbar-hide flex space-x-3 overflow-x-auto pb-3 sm:space-x-4 sm:pb-4 md:space-x-5 md:pb-5 lg:space-x-4 lg:pb-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="w-56 flex-shrink-0 sm:w-60 md:w-64 lg:w-56"
          >
            <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:p-4 md:p-5 lg:p-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex aspect-square w-10 items-center justify-center rounded-lg sm:w-12 md:w-14 lg:w-10 ${item.color}`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-[#2B2B2B] sm:text-base md:text-lg lg:text-sm">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-[#8A8A8A] sm:text-sm md:text-base lg:text-xs">
                    {item.description}
                  </p>
                </div>
                <BsArrowRight className="flex-shrink-0 text-[#1C4E80]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
