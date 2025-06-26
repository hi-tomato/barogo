"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyPageBaropotPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
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
            내 바로팟
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("created")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "created"
                ? "text-[#1C4E80] border-b-2 border-[#1C4E80]"
                : "text-gray-500"
            }`}
          >
            내가 만든 바로팟
          </button>
          <button
            onClick={() => setActiveTab("joined")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "joined"
                ? "text-[#1C4E80] border-b-2 border-[#1C4E80]"
                : "text-gray-500"
            }`}
          >
            참여한 바로팟
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "created" ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">내가 만든 바로팟</h2>
              <p className="text-gray-500 text-center py-8">
                아직 만든 바로팟이 없습니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">참여한 바로팟</h2>
              <p className="text-gray-500 text-center py-8">
                아직 참여한 바로팟이 없습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
