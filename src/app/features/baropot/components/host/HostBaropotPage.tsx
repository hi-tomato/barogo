'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useGetBaropotDetail,
  useGetHostBaropotList,
} from '@/app/shared/hooks/queries/useBaropot';
import { BaropotsQueries } from '@/app/shared/types/baropots';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { statusOptions } from '@/app/shared/lib/baropotOptions';
import { BaropotStatus, baropotStatusKorean } from '@/app/shared/types/enums';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { Input } from '@/app/shared/ui';
import HostManagementPanel from './HostManagementPanel';

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
      [key]: value === '' ? undefined : value,
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );

    if (!statusOption) {
      return (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
          {status}
        </span>
      );
    }

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${statusOption.bgColor} ${statusOption.textColor}`}
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
      <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
        <div className="text-center">
          <p className="mb-4 text-red-600">데이터를 불러오는데 실패했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#1C4E80] px-4 py-2 text-white hover:bg-blue-700"
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
          <p className="mt-1 text-[#8A8A8A]">
            호스트로 참여중인 모임을 관리해보세요
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* 필터 섹션 */}
        <motion.div
          className="mb-6 rounded-xl bg-white p-6 shadow-sm"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="mb-4 text-lg font-semibold text-[#2B2B2B]">필터</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* 상태 필터 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
                상태
              </label>
              <select
                value={queries.statusList || ''}
                onChange={(e) =>
                  handleFilterChange('statusList', e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#1C4E80]"
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
            <Input
              type="text"
              placeholder="바로팟 제목 검색"
              value={queries.title || ''}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              label="제목 검색"
            />

            {/* 맛집 이름 검색 */}
            <Input
              type="text"
              placeholder="맛집 이름 검색"
              value={queries.restaurantName || ''}
              onChange={(e) =>
                handleFilterChange('restaurantName', e.target.value)
              }
              label="맛집 이름"
            />
          </div>
        </motion.div>

        {/* 바로팟 목록 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 h-4 rounded bg-gray-200"></div>
                  <div className="mb-2 h-3 rounded bg-gray-200"></div>
                  <div className="mb-4 h-3 rounded bg-gray-200"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-12 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : baropots && baropots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {baropots.map((baropot) => (
                <motion.div
                  key={baropot.id}
                  variants={itemVariants}
                  className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  onClick={() => {
                    // TODO: 상세 페이지로 이동
                    console.log('바로팟 상세:', baropot.id);
                  }}
                >
                  {/* 상태와 날짜 */}
                  <div className="mb-4 flex items-start justify-between">
                    {getStatusBadge(baropot.status)}
                    <span className="text-sm text-[#8A8A8A]">
                      {baropot.date} {baropot.time}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-[#2B2B2B]">
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
                  <div className="mb-4 flex items-center justify-between">
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
                          className="rounded-full bg-[#E6EEF5] px-2 py-1 text-xs text-[#1C4E80]"
                        >
                          #{tag}
                        </span>
                      ))}
                      {baropot.tags.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          +{baropot.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 액션 버튼 */}
                  <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                    <button
                      className="flex-1 rounded-lg bg-[#1C4E80] px-4 py-2 text-white transition-colors hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBaropotId(baropot.id);
                      }}
                    >
                      관리하기
                    </button>
                    <button
                      className="rounded-lg border border-[#1C4E80] px-4 py-2 text-[#1C4E80] transition-colors hover:bg-[#E6EEF5]"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 수정 페이지로 이동
                        console.log('바로팟 수정:', baropot.id);
                      }}
                    >
                      수정
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="py-12 text-center">
              <div className="mb-4 text-6xl">🍽️</div>
              <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">
                아직 만든 바로팟이 없어요
              </h3>
              <p className="mb-6 text-[#8A8A8A]">
                새로운 바로팟을 만들어 사람들과 함께 맛있는 시간을 보내보세요!
              </p>
              <button className="rounded-lg bg-[#1C4E80] px-6 py-3 text-white transition-colors hover:bg-blue-700">
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
