'use client';
import { useParams, useRouter } from 'next/navigation';
import {
  useGetBaropotDetail,
  useGetBaropotEdit,
} from '@/app/shared/hooks/queries/useBaropot';
import { useState, useEffect } from 'react';
import { BaropotDetailResponse } from '@/app/shared/types/baropots';
import { Input } from '@/app/shared/ui';

export default function BaropotEditPage() {
  const params = useParams();
  const router = useRouter();
  const baropotId = Number(params.baropotId);

  const { data: baropot, isError } = useGetBaropotDetail(baropotId);
  const updateBaropotMutation = useGetBaropotEdit();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: 4,
  });

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (baropot) {
      setFormData({
        title: baropot.title || '',
        description: baropot.description || '',
        date: baropot.date || '',
        time: baropot.time || '',
        maxParticipants: baropot.maxParticipants || 4,
      });
    }
  }, [baropot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 수정 로직 구현
    updateBaropotMutation.mutate({
      baropotId,
      baropotData: formData,
    });
    router.push(`/baropot/${baropotId}`);
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-[#2B2B2B]">
            바로팟 수정
          </h1>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">바로팟 정보 수정</h2>

            <div className="space-y-4">
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                label="바로팟 제목 *"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#1C4E80] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  label="날짜 *"
                />
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                  label="시간 *"
                />
              </div>

              <Input
                type="number"
                min="2"
                max="10"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxParticipants: parseInt(e.target.value),
                  })
                }
                required
                label="최대 인원 *"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg bg-gray-500 py-3 text-white transition-colors hover:bg-gray-600"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#1C4E80] py-3 text-white transition-colors hover:bg-[#154066]"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
