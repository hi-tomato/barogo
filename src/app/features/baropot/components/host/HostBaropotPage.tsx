"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetBaropotDetail,
  useGetHostBaropotList,
} from "@/app/shared/hooks/queries/useBaropot";
import { BaropotsQueries } from "@/app/shared/types/baropots";
import { containerVariants, itemVariants } from "@/app/shared/lib/animation";
import { statusOptions } from "@/app/shared/lib/baropotOptions";
import { BaropotStatus, baropotStatusKorean } from "@/app/shared/types/enums";
import { useAuthStore } from "@/app/shared/store/useAuthStore";
import HostManagementPanel from "./HostManagementPanel";

export default function HostBaropotPage() {
  const { user } = useAuthStore();
  const [selectedBaropotId, setSelectedBaropotId] = useState<number | null>(
    null
  );

  const { data: selectedBaropotDetail } = useGetBaropotDetail(
    selectedBaropotId || 0
  );

  const [queries, setQueries] = useState<BaropotsQueries>(
    {} as BaropotsQueries
  );
  const { data: baropots, isLoading, error } = useGetHostBaropotList(queries);

  const handleFilterChange = (key: keyof BaropotsQueries, value: any) => {
    setQueries((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );

    if (!statusOption) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusOption.bgColor} ${statusOption.textColor}`}
      >
        {statusOption.label}
      </span>
    );
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setSelectedBaropotId(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">데이터를 불러오는데 실패했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#1C4E80] text-white rounded-lg hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-[#2B2B2B]">
            내가 만든 바로팟
          </h1>
          <p className="text-[#8A8A8A] mt-1">
            호스트로 참여중인 모임을 관리해보세요
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* 필터 섹션 */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-lg font-semibold text-[#2B2B2B] mb-4">필터</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 상태 필터 */}
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                상태
              </label>
              <select
                value={queries.statusList || ""}
                onChange={(e) =>
                  handleFilterChange("statusList", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
              >
                <option value="">전체</option>
                {Object.values(BaropotStatus).map((status) => (
                  <option key={status} value={status}>
                    {baropotStatusKorean[status as BaropotStatus]}
                  </option>
                ))}
              </select>
            </div>

            {/* 제목 검색 */}
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                제목 검색
              </label>
              <input
                type="text"
                placeholder="바로팟 제목 검색"
                value={queries.title || ""}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
              />
            </div>

            {/* 맛집 이름 검색 */}
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                맛집 이름
              </label>
              <input
                type="text"
                placeholder="맛집 이름 검색"
                value={queries.restaurantName || ""}
                onChange={(e) =>
                  handleFilterChange("restaurantName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* 바로팟 목록 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : baropots && baropots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {baropots.map((baropot) => (
                <motion.div
                  key={baropot.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    // TODO: 상세 페이지로 이동
                    console.log("바로팟 상세:", baropot.id);
                  }}
                >
                  {/* 상태와 날짜 */}
                  <div className="flex justify-between items-start mb-4">
                    {getStatusBadge(baropot.status)}
                    <span className="text-sm text-[#8A8A8A]">
                      {baropot.date} {baropot.time}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2 line-clamp-1">
                    {baropot.title}
                  </h3>

                  {/* 맛집 정보 */}
                  <div className="mb-3">
                    <p className="font-medium text-[#2B2B2B]">
                      {baropot.restaurant.name}
                    </p>
                    <p className="text-sm text-[#8A8A8A]">
                      {baropot.restaurant.address}
                    </p>
                  </div>

                  {/* 참가자 정보 */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#8A8A8A]">참가자</span>
                      <span className="font-medium text-[#1C4E80]">
                        {baropot.participantCount}/{baropot.maxParticipants}명
                      </span>
                    </div>
                    <div className="text-sm text-[#8A8A8A]">
                      📍 {baropot.restaurant.address}
                    </div>
                  </div>

                  {/* 태그 */}
                  {baropot.tags && baropot.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {baropot.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#E6EEF5] text-[#1C4E80] text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {baropot.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{baropot.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      className="flex-1 px-4 py-2 bg-[#1C4E80] text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBaropotId(baropot.id);
                      }}
                    >
                      관리하기
                    </button>
                    <button
                      className="px-4 py-2 border border-[#1C4E80] text-[#1C4E80] rounded-lg hover:bg-[#E6EEF5] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 수정 페이지로 이동
                        console.log("바로팟 수정:", baropot.id);
                      }}
                    >
                      수정
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">
                아직 만든 바로팟이 없어요
              </h3>
              <p className="text-[#8A8A8A] mb-6">
                새로운 바로팟을 만들어 사람들과 함께 맛있는 시간을 보내보세요!
              </p>
              <button className="px-6 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-blue-700 transition-colors">
                바로팟 만들기
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 호스트 관리 모달 */}
      {selectedBaropotDetail && (
        <HostManagementPanel
          baropot={selectedBaropotDetail}
          currentUserId={user?.id || 0}
          isOpen={!!selectedBaropotId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
