import { cn } from '@/app/shared/lib/cn';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'gray';
  className?: string;
  inline?: boolean;
}

export default function LoadingSpinner({
  message = '로딩중...',
  size = 'md',
  color = 'blue',
  className,
  inline = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    blue: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        sizeClasses[size],
        colorClasses[color]
      )}
    />
  );

  if (inline) return spinner;

  return (
    <div className={cn('text-center', className)}>
      <div className="mx-auto mb-4 flex justify-center">{spinner}</div>
      {message && <p className="text-gray-500">{message}</p>}
    </div>
  );
}
