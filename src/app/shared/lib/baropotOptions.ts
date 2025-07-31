import { BaropotStatus } from '@/app/shared/types/enums';

export const statusOptions = [
  {
    value: BaropotStatus.OPEN,
    label: '모집중',
    color: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    icon: '📋',
  },
  {
    value: BaropotStatus.FULL,
    label: '정원마감',
    color: 'bg-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: '⏰',
  },
  {
    value: BaropotStatus.IN_PROGRESS,
    label: '진행중',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: '🎯',
  },
  {
    value: BaropotStatus.COMPLETED,
    label: '완료',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: '✅',
  },
  {
    value: BaropotStatus.CANCELLED,
    label: '취소',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: '❌',
  },
];
