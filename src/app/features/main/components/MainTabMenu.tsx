import Link from "next/link";

import { BsArrowRight } from "react-icons/bs";

export default function MainTabMenu() {
  return (
    <div className="space-y-4">
      <Link href="/nearby" className="block">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#e4e7ea] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📍</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#2B2B2B] text-lg mb-1">
                내 주변 맛집
              </h3>
              <p className="text-[#8A8A8A] text-sm">
                현재 위치 기준으로 가까운 맛집을 찾아보세요
              </p>
            </div>
            <BsArrowRight className="text-[#1C4E80]" />
          </div>
        </div>
      </Link>

      {/* 찜한 맛집 */}
      <Link href="/popular" className="block">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#e4e7ea] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💙</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#2B2B2B] text-lg mb-1">
                찜한 맛집
              </h3>
              <p className="text-[#8A8A8A] text-sm">
                저장해둔 맛집 리스트를 확인해보세요
              </p>
            </div>
            <BsArrowRight className="text-[#1C4E80]" />
          </div>
        </div>
      </Link>

      {/* 바로팟 현황 */}
      <Link href="/baropot" className="block">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#e4e7ea] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#2B2B2B] text-lg mb-1">
                바로팟 현황
              </h3>
              <p className="text-[#8A8A8A] text-sm">
                실시간 번개 모임에 참여해보세요
              </p>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                  🔥 HOT
                </span>
              </div>
            </div>
            <BsArrowRight className="text-[#1C4E80]" />
          </div>
        </div>
      </Link>
    </div>
  );
}
