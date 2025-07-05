import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { cn } from '../lib/cn';

interface StateDisplayProps {
  state: 'loading' | 'error' | 'empty';
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  emptyIcon?: string;
  size: 'sm' | 'md' | 'lg';
  onRetry?: () => void;
  className?: string;
}
export default function StateDisplay({
  state,
  loadingMessage,
  errorMessage,
  emptyMessage = '찾을 수 없습니다.',
  emptyIcon = '🤦‍♂️',
  size = 'md',
  onRetry,
  className,
}: StateDisplayProps) {
  if (state === 'loading') {
    return (
      <LoadingSpinner
        message={loadingMessage}
        size={size}
        className={className}
      />
    );
  }

  if (state === 'error') {
    return (
      <ErrorMessage
        message={errorMessage}
        size={size}
        className={className}
        onRetry={onRetry}
      />
    );
  }

  if (state === 'empty') {
    return (
      <div className={cn('py-8 text-center text-gray-500', className)}>
        <span className="mb-4 block text-4xl">{emptyIcon}</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return null;
}
