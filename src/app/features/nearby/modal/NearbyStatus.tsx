import { Status } from '@/app/shared/ui';

interface StatusMessageProps {
  type: 'loading' | 'error' | 'notFound' | 'locationButton';
  message?: string;
  onAction?: () => void;
  loading?: boolean;
}

export default function NearbyStatus({
  type,
  message,
  onAction,
  loading,
}: StatusMessageProps) {
  if (type === 'loading') {
    return <Status type="loading" size="md" />;
  }
  if (type === 'error') {
    return <Status type="error" message={message} size="md" />;
  }
  if (type === 'notFound') {
    return (
      <Status
        type="empty"
        icon="🔍"
        title="주변에 맛집이 없어요"
        message={
          <>
            다른 지역을 검색하거나
            <br />
            검색 범위를 넓혀보세요
            <div className="mt-2 rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-400">
              💡 팁: 위치를 다시 확인해보세요
            </div>
          </>
        }
        size="md"
      />
    );
  }
  if (type === 'locationButton') {
    return (
      <Status
        type="locationButton"
        action={{
          label: loading ? '위치 찾는 중...' : '현재 위치 찾기',
          onClick: onAction || (() => {}),
          loading,
        }}
        size="md"
      />
    );
  }
  return null;
}
