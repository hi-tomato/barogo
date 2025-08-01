import { cn } from '../lib/cn';
import Button from './Button';

type StatusType =
  | 'loading'
  | 'error'
  | 'empty'
  | 'success'
  | 'uploading'
  | 'locationButton'
  | 'custom';
type Size = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'centered' | 'inline';

interface StatusProps {
  type: StatusType;
  title?: string;
  message?: React.ReactNode;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  className?: string;
  size?: Size;
  variant?: Variant;
}

const defaultMessages = {
  loading: {
    title: 'Loading...',
    icon: '⏳',
    message: '잠시만 기다려주세요',
  },
  error: {
    title: '오류가 발생하였습니다!',
    icon: '⚠️',
    message: '다시 시도해주세요.',
  },
  success: {
    title: '성공!',
    icon: '✅',
    message: '작업이 완료되었습니다',
  },
  uploading: {
    title: '업로드 중...',
    icon: '⏳',
    message: '잠시만 기다려주세요',
  },
  notFound: {
    title: '찾을 수 없습니다',
    icon: '⚠️',
    message: '다른 방법으로 시도해보세요',
  },
};

const statusVariants = {
  default: 'text-center py-8',
  centered: 'flex items-center justify-center min-h-[200px] text-center py-12',
  inline: 'flex items-center space-x-2',
};

const statusSizes = {
  sm: {
    icon: 'text-2xl',
    title: 'text-sm font-medium',
    message: 'text-xs',
    container: 'py-4',
  },
  md: {
    icon: 'text-4xl',
    title: 'text-base font-semibold',
    message: 'text-sm',
    container: 'py-8',
  },
  lg: {
    icon: 'text-6xl',
    title: 'text-lg font-semibold',
    message: 'text-base',
    container: 'py-12',
  },
};

export default function Status({
  type,
  title,
  message,
  icon,
  action,
  className = '',
  size = 'md',
  variant = 'default',
}: StatusProps) {
  const defaultConfig = defaultMessages[type as keyof typeof defaultMessages];
  const finalTitle = title || defaultConfig?.title;
  const finalMessage = message || defaultConfig?.message;
  const finalIcon = icon || defaultConfig?.icon;

  const sizeConfig = statusSizes[size];
  const variantConfig = statusVariants[variant];

  const renderContents = () => {
    switch (type) {
      case 'loading':
        return (
          <div
            className={cn(
              'flex flex-col items-center space-y-4',
              sizeConfig.container
            )}
          >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
            <div className="text-gray-500">{finalTitle}</div>
            {finalMessage && (
              <div className="text-sm text-gray-400">{finalMessage}</div>
            )}
          </div>
        );

      case 'locationButton':
        return (
          <div className="py-8 text-center">
            <Button
              text={action?.loading ? '위치 찾는 중...' : '현재 위치 찾기'}
              onClick={action?.onClick || (() => {})}
              disabled={action?.loading}
              variant="primary"
              size="lg"
              fullWidth
            />
          </div>
        );

      case 'custom':
        return (
          <div
            className={cn(
              'flex flex-col items-center space-y-4',
              sizeConfig.container
            )}
          >
            {finalIcon && <div className={sizeConfig.icon}>{finalIcon}</div>}
            {finalTitle && (
              <div className={cn('text-gray-700', sizeConfig.title)}>
                {finalTitle}
              </div>
            )}
            {finalMessage && (
              <div className={cn('text-gray-500', sizeConfig.message)}>
                {finalMessage}
              </div>
            )}
            {action && (
              <Button
                text={action.label}
                onClick={action.onClick}
                loading={action.loading}
                variant="primary"
                size="md"
              />
            )}
          </div>
        );

      default:
        return (
          <div
            className={cn(
              'flex flex-col items-center space-y-4',
              sizeConfig.container
            )}
          >
            {finalIcon && (
              <div className={cn('opacity-60', sizeConfig.icon)}>
                {finalIcon}
              </div>
            )}
            {finalTitle && (
              <div className={cn('text-gray-700', sizeConfig.title)}>
                {finalTitle}
              </div>
            )}
            {finalMessage && (
              <div className={cn('text-gray-500', sizeConfig.message)}>
                {finalMessage}
              </div>
            )}
            {action && (
              <Button
                text={action.label}
                onClick={action.onClick}
                loading={action.loading}
                variant="primary"
                size="md"
              />
            )}
          </div>
        );
    }
  };

  return <div className={cn(variantConfig, className)}>{renderContents()}</div>;
}
