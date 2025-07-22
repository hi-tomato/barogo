'use client';
import { cn } from '@/app/shared/lib/cn';
import {
  HiCheck,
  HiExclamation,
  HiInformationCircle,
  HiX,
} from 'react-icons/hi';
import Button from '@/app/shared/ui/Button';

interface ToastProps {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onRemove: (id: number) => void;
}

const toastStyles = {
  success:
    'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-l-emerald-400 shadow-emerald-500/20',
  error:
    'bg-gradient-to-r from-rose-500 to-rose-600 text-white border-l-rose-400 shadow-rose-500/20',
  warning:
    'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-l-amber-400 shadow-amber-500/20',
  info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-l-blue-400 shadow-blue-500/20',
};

const iconStyles = {
  success: <HiCheck className="h-5 w-5" />,
  error: <HiX className="h-5 w-5" />,
  warning: <HiExclamation className="h-5 w-5" />,
  info: <HiInformationCircle className="h-5 w-5" />,
};

export default function Toast({ id, message, type, onRemove }: ToastProps) {
  return (
    <div
      className={cn(
        'animate-in slide-in-from-right-full flex max-w-[400px] min-w-[320px] items-center justify-between rounded-xl border-l-4 p-4 shadow-lg backdrop-blur-sm duration-300',
        toastStyles[type as keyof typeof toastStyles]
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">
          {iconStyles[type as keyof typeof iconStyles]}
        </span>
        <span className="text-sm font-medium">{message}</span>
      </div>
      <Button
        onClick={() => onRemove(id)}
        size="icon"
        aria-label="토스트 닫기"
        className="text-white/85 transition-colors duration-200 hover:bg-white/20 hover:text-white"
        variant="ghost"
        icon={<HiX className="h-4 w-4" />}
      />
    </div>
  );
}
