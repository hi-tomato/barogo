"use client";
import { useParams, useRouter } from "next/navigation";
import {
  useGetBaropotDetail,
  useGetBaropotEdit,
} from "@/app/shared/hooks/queries/useBaropot";
import { useState, useEffect } from "react";
import { BaropotDetailResponse } from "@/app/shared/types/baropots";

export default function BaropotEditPage() {
  const params = useParams();
  const router = useRouter();
  const baropotId = Number(params.baropotId);

  const { data: baropot, isError } = useGetBaropotDetail(baropotId);
  const updateBaropotMutation = useGetBaropotEdit();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    maxParticipants: 4,
  });

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (baropot) {
      setFormData({
        title: baropot.title || "",
        description: baropot.description || "",
        date: baropot.date || "",
        time: baropot.time || "",
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
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">바로팟 정보 수정</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  바로팟 제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    날짜 *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    시간 *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 인원 *
                </label>
                <input
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C4E80]"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#1C4E80] text-white py-3 rounded-lg hover:bg-[#154066] transition-colors"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
