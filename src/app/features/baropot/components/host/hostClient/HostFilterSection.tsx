import { BaropotStatus, baropotStatusKorean } from '@/app/shared/types/enums';
import { Input } from '@/app/shared/ui';
import { BaropotsQueries } from '@/app/shared/types/baropots';
import { useId, useMemo } from 'react';

export default function HostFilterSection({
  queries,
  handleFilterChange,
}: {
  queries: BaropotsQueries;
  handleFilterChange: (key: keyof BaropotsQueries, value: any) => void;
}) {
  const baseId = useId();

  const statusOptions = useMemo(() => {
    return Object.values(BaropotStatus).map((status) => ({
      value: status,
      label: baropotStatusKorean[status as BaropotStatus],
    }));
  }, []);

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-[#2B2B2B]">필터</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 상태 필터 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            상태
          </label>
          <select
            value={queries.statusList || ''}
            onChange={(e) => handleFilterChange('statusList', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#1C4E80]"
            id={`${baseId}-status-select`}
          >
            <option value="">전체</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
          id={`${baseId}-title-input`}
        />

        {/* 맛집 이름 검색 */}
        <Input
          type="text"
          placeholder="맛집 이름 검색"
          value={queries.restaurantName || ''}
          onChange={(e) => handleFilterChange('restaurantName', e.target.value)}
          label="맛집 이름"
          id={`${baseId}-restaurant-name-input`}
        />
      </div>
    </>
  );
}
