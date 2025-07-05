import { Status } from '@/app/shared/ui';

interface PopularStatusProps {
  type: 'loading' | 'error' | 'notFound';
}

export default function PopularStatus({ type }: PopularStatusProps) {
  if (type === 'notFound') {
    return (
      <Status
        type="empty"
        icon="💔"
        title="찜한 맛집이 없어요"
        message="맛집을 찜해보세요!"
        size="lg"
      />
    );
  }
  if (type === 'error') {
    return (
      <Status
        type="error"
        icon="⚠️"
        title="데이터를 불러오는데 실패했습니다"
        size="lg"
      />
    );
  }
  // loading
  return <Status type="loading" size="lg" />;
}
