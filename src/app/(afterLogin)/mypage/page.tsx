"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const [userStats] = useState({
    reviews: 12,
    baropots: 12,
    bookmarks: 12,
  });

  const menuItems = [
    {
      id: "my-reviews",
      title: "내 리뷰",
      icon: "📝",
      path: "/mypage/reviews",
    },
    {
      id: "baropot",
      title: "바로팟",
      icon: "⚡",
      path: "/mypage/baropot",
    },
    {
      id: "bookmarks",
      title: "찜한곳",
      icon: "💙",
      path: "/mypage/bookmarks",
    },
    {
      id: "visited",
      title: "방문기록(지도)",
      icon: "📍",
      path: "/mypage/visited",
    },
    {
      id: "settings",
      title: "설정",
      icon: "⚙️",
      path: "/mypage/settings",
    },
    {
      id: "history",
      title: "히스토리",
      icon: "📊",
      path: "/mypage/history",
    },
  ];

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] pb-24">
      {/* 헤더 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            마이페이지
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 프로필 섹션 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="w-16 h-16 bg-[#1C4E80] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">태</span>
            </div>

            {/* 사용자 정보 */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#2B2B2B] mb-1">
                대짭토
              </h2>
              <p className="text-[#8A8A8A] text-sm">맛집 탐험가</p>
            </div>
          </div>

          {/* 통계 */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1C4E80] mb-1">
                {userStats.reviews}
              </div>
              <div className="text-sm text-[#8A8A8A]">리뷰</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1C4E80] mb-1">
                {userStats.baropots}
              </div>
              <div className="text-sm text-[#8A8A8A]">바로팟</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1C4E80] mb-1">
                {userStats.bookmarks}
              </div>
              <div className="text-sm text-[#8A8A8A]">찜한곳</div>
            </div>
          </div>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-[#2B2B2B] font-medium">{item.title}</div>
            </button>
          ))}
        </div>

        {/* 추가 정보 섹션 : 하드코딩 해두어씀 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#2B2B2B] mb-3">최근 활동</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">⚡</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#2B2B2B]">
                  홍대 맛집 바로팟에 참여했어요
                </p>
                <p className="text-xs text-[#8A8A8A]">2시간 전</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm">📝</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#2B2B2B]">
                  석압생소금구이 리뷰를 작성했어요
                </p>
                <p className="text-xs text-[#8A8A8A]">1일 전</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">💙</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#2B2B2B]">홀리스 타코를 찜했어요</p>
                <p className="text-xs text-[#8A8A8A]">3일 전</p>
              </div>
            </div>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button className="w-full bg-white text-red-500 font-medium py-4 rounded-xl shadow-sm hover:bg-red-50 transition-colors">
          로그아웃
        </button>
      </div>
    </div>
  );
}
