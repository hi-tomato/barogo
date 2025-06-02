"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function BaropotModal() {
  const [baropotList, setBaropotList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ongoing"); // ongoing, upcoming, my
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setBaropotList(dummyBaropot);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting":
        return "bg-blue-100 text-blue-600";
      case "full":
        return "bg-gray-100 text-gray-600";
      case "closed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "recruiting":
        return "모집중";
      case "full":
        return "모집완료";
      case "closed":
        return "마감";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000004c] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">바로팟 현황</h2>
            <p className="text-sm text-gray-500 mt-1">
              실시간 모임 현황을 확인하세요
            </p>
          </div>
          <Button
            text="x"
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
          />
        </div>

        {/* 탭 */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "ongoing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            진행중인 모임
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "upcoming"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            예정된 모임
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "my"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            내 모임
          </button>
        </div>

        {/* 리스트 */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">로딩중...</div>
          ) : baropotList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              현재 진행중인 바로팟이 없습니다
            </div>
          ) : (
            <div className="space-y-4">
              {baropotList.map((baropot: any) => (
                <div
                  key={baropot.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  {/* 헤더 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {baropot.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            baropot.status
                          )}`}
                        >
                          {getStatusText(baropot.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        @{baropot.restaurant}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {baropot.currentPeople}/{baropot.maxPeople}명
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (baropot.currentPeople / baropot.maxPeople) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* 정보 */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">📍</span>
                      {baropot.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">🕐</span>
                      {baropot.date} {baropot.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">👤</span>
                      호스트: {baropot.host}
                    </div>
                  </div>

                  {/* 태그 */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {baropot.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        baropot.status === "recruiting"
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={baropot.status !== "recruiting"}
                    >
                      {baropot.status === "recruiting"
                        ? "참여하기"
                        : "참여불가"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            새 바로팟 만들기
          </button>
        </div>
      </div>
    </div>
  );
}

interface BaropotModal {
  id: number;
  title: string;
  restaurant: string;
  location: string;
  date: Date;
  time: Date;
  maxPeople: number;
  currentPeople: number;
  status: string; // [recruiting, full, closed]
  host: string;
  tags: string[][][];
}

const dummyBaropot: BaropotModal[] = [
  {
    id: 1,
    title: "홍대 맛집 투어",
    restaurant: "홀리스 타코",
    location: "홍대입구역 2번 출구",
    date: "2025-06-03",
    time: "19:00",
    maxPeople: 4,
    currentPeople: 2,
    status: "recruiting", // recruiting, full, closed
    host: "김맛집",
    tags: ["멕시칸", "20대", "직장인"],
  },
  {
    id: 2,
    title: "강남 고기파티",
    restaurant: "석압생소금구이",
    location: "강남역 3번 출구",
    date: "2025-06-04",
    time: "18:30",
    maxPeople: 6,
    currentPeople: 6,
    status: "full",
    host: "고기왕",
    tags: ["한식", "30대", "회식"],
  },
  {
    id: 3,
    title: "을지로 레트로 맛집",
    restaurant: "고베스테이",
    location: "을지로3가역 1번 출구",
    date: "2025-06-05",
    time: "20:00",
    maxPeople: 3,
    currentPeople: 1,
    status: "recruiting",
    host: "레트로러버",
    tags: ["퓨전", "20대", "데이트"],
  },
];
