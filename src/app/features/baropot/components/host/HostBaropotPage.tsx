'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useGetBaropotDetail,
  useGetHostBaropotList,
} from '@/app/shared/hooks/queries/useBaropot';
import { BaropotsQueries } from '@/app/shared/types/baropots';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { StateDisplay } from '@/app/shared/ui';
import HostManagementPanel from './HostManagementPanel';
import HostBaropotSkeleton from './hostClient/HostBaropotSkeleton';
import HostBaropotInfoCard from './hostClient/HostBaropotInfoCard';
import HostFilterSection from './hostClient/HostFilterSection';

export default function HostBaropotPage() {
  const { user } = useAuthStore();
  const [selectedBaropotId, setSelectedBaropotId] = useState<number | null>(
    null
  );
  const [queries, setQueries] = useState<BaropotsQueries>(
    {} as BaropotsQueries
  );

  const { data: selectedBaropotDetail } = useGetBaropotDetail(
    selectedBaropotId ?? 0
  );

  const { data: baropots, isLoading, error } = useGetHostBaropotList(queries);

  const handleFilterChange = (key: keyof BaropotsQueries, value: any) => {
    setQueries((prev) => ({
      ...prev,
      [key]: value === '' ? undefined : value,
    }));
  };

  console.log('selectedBaropotDetail', selectedBaropotDetail);
  if (error) {
    return <StateDisplay state="error" size="sm" />;
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
          <HostFilterSection
            queries={queries}
            handleFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* 바로팟 목록 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <HostBaropotSkeleton />
          ) : baropots && baropots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {baropots.map((baropot) => (
                <HostBaropotInfoCard
                  key={baropot.id}
                  baropot={baropot}
                  onManageClick={setSelectedBaropotId}
                />
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="py-12 text-center">
              <StateDisplay state="empty" size="sm" />
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
          onClose={() => setSelectedBaropotId(null)}
        />
      )}
    </div>
  );
}
