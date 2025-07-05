import React from 'react';
import { cn } from '../lib/cn';

interface ErrorMessageProps {
  message?: React.ReactNode;
  icon?: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
  className?: string;
  onRetry?: () => void;
  retryText?: string;
}
export default function ErrorMessage({
  message = '오류가 발생했습니다',
  icon = '🚨',
  size = 'md',
  className,
  onRetry,
  retryText = '다시 시도',
}: ErrorMessageProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6lx',
  };

  return (
    <div className={cn('py-8 text-center', className)}>
      <span className={cn('mb-4 block', sizeClasses[size])}>{icon}</span>
      <p className="mb-4 text-red-500">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-blue-500 hover:underline">
          {retryText}
        </button>
      )}
    </div>
  );
}
