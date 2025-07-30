'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useGetBaropotDetail,
  useGetHostBaropotList,
} from '@/app/shared/hooks/queries/useBaropot';
import {
  HostBaropotSkeleton,
  HostBaropotInfoCard,
  HostFilterSection,
} from './hostClient';
import { BaropotsQueries } from '@/app/shared/types/baropots';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { StateDisplay } from '@/app/shared/ui';
import HostManagementPanel from './HostManagementPanel';
import { HostHeader } from './HostHeader';

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

  if (error) return <StateDisplay state="error" size="sm" />;

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <HostHeader onClose={() => setSelectedBaropotId(null)} />
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
