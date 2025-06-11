"use client";
import KaKaoContainer from "@/app/features/map/components/KaKaoContainer";
import { Restaurant } from "@/app/shared/types/map";
import { useRouter } from "next/navigation";

export default function KakaoMapView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 뒤로가기 헤더 등 */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => router.back()}>←</button>
          <h1 className="flex-1 text-center text-lg font-semibold">지도</h1>
        </div>
      </div>

      <KaKaoContainer />
    </div>
  );
}

export const dummyRestaurants: Restaurant[] = [
  {
    id: "26338954",
    name: "토마토김밥",
    lat: 37.5665,
    lng: 126.978,
    description: "김밥계의 샤넬. 언제나 옳은 맛",
    category: "한식",
    hasBaropot: true,
    baropotCount: 2,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "12345678", // ⭐ kakaoId 형식
    name: "마라탕의 전설",
    lat: 37.5655,
    lng: 126.976,
    description: "중독주의! 얼얼한 마라의 세계",
    category: "중식",
    hasBaropot: true,
    baropotCount: 1,
    rating: 4.2,
    reviewCount: 89,
  },
  {
    id: "87654321", // ⭐ kakaoId 형식
    name: "스타벅스 홍대점",
    lat: 37.567,
    lng: 126.975,
    description: "커피 한 잔의 여유를 즐겨보세요",
    category: "카페",
    hasBaropot: false,
    baropotCount: 0,
    rating: 4.0,
    reviewCount: 256,
  },
  {
    id: "11111111", // ⭐ kakaoId 형식
    name: "스시 오마카세",
    lat: 37.5645,
    lng: 126.98,
    description: "신선한 스시를 합리적인 가격에",
    category: "일식",
    hasBaropot: true,
    baropotCount: 3,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "22222222", // ⭐ kakaoId 형식
    name: "파스타 레스토랑",
    lat: 37.568,
    lng: 126.972,
    description: "정통 이탈리안 파스타 전문점",
    category: "양식",
    hasBaropot: false,
    baropotCount: 0,
    rating: 4.3,
    reviewCount: 143,
  },
];
