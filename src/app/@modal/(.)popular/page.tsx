"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function FavoriteRestaurantsModal() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setFavorites(dummyFavorites);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0000005d] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">찜한 맛집</h2>
          <Button
            text="x"
            onClick={() => router.back()}
            className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          />
        </div>

        {/* 리스트 */}
        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-12 text-gray-500">로딩중...</div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              찜한 맛집이 없습니다
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {favorites.map((restaurant: any, index: number) => (
                <div
                  key={restaurant.id}
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* 순위 */}
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm font-medium text-gray-600 mr-3">
                    {index + 1}
                  </div>

                  {/* 이미지 */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {restaurant.address}
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <span className="text-red-500 text-sm">👍</span>
                        <span className="text-red-500 text-sm font-medium ml-1">
                          별점 좋아요 {restaurant.reviews}개
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm font-medium ml-1">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const dummyFavorites = [
  {
    id: 1,
    name: "홀리스 타코",
    address: "멕시칸음식 • 을지로",
    rating: 4.6,
    reviews: 684,
    image: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "석압생소금구이 용산점",
    address: "육류,고기요리 • 신용산",
    rating: 4.3,
    reviews: 1048,
    image: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "고베스테이 신대방직영점",
    address: "퓨젼 • 구로",
    rating: 4.1,
    reviews: 1425,
    image: "/api/placeholder/80/80",
  },
  {
    id: 4,
    name: "안주마을",
    address: "해물,생선요리 • 서촌",
    rating: 4.5,
    reviews: 747,
    image: "/api/placeholder/80/80",
  },
];
