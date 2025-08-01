'use client';
import { useState, useEffect } from 'react';
import { BaropotEditRequest } from '@/app/shared/types/baropots';
import { Input } from '@/app/shared/ui';
import {
  ParticipantGender,
  ParticipantAgeGroup,
  ContactMethod,
  PaymentMethod,
} from '@/app/shared/types/enums';

interface BaropotEditFormProps {
  initialData?: BaropotEditRequest;
  onSubmit: (data: BaropotEditRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BaropotEditForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: BaropotEditFormProps) {
  const [formData, setFormData] = useState<BaropotEditRequest>({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: 4,
    location: '',
    participantGender: ParticipantGender.ANY,
    participantAgeGroup: ParticipantAgeGroup.ANY,
    contactMethod: ContactMethod.KAKAO_TALK,
    paymentMethod: PaymentMethod.DUTCH_PAY,
    tags: [],
    estimatedCostPerPerson: 0,
    rule: '',
  });

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        date: initialData.date || '',
        time: initialData.time || '',
        maxParticipants: initialData.maxParticipants || 4,
        location: initialData.location || '',
        participantGender:
          initialData.participantGender || ParticipantGender.ANY,
        participantAgeGroup:
          initialData.participantAgeGroup || ParticipantAgeGroup.ANY,
        contactMethod: initialData.contactMethod || ContactMethod.KAKAO_TALK,
        paymentMethod: initialData.paymentMethod || PaymentMethod.DUTCH_PAY,
        tags: initialData.tags || [],
        estimatedCostPerPerson: initialData.estimatedCostPerPerson || 0,
        rule: initialData.rule || '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-500 py-3 text-white transition-colors hover:bg-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-lg bg-[#1C4E80] py-3 text-white transition-colors hover:bg-[#154066] disabled:opacity-50"
          >
            {isLoading ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </div>
  );
}
