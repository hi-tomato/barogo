import { Status } from '@/app/shared/ui';

interface SearchStatusProps {
  type: 'loading' | 'error' | 'emptyResults';
  error?: string;
  query?: string;
}

export const SearchStatus = ({ type, error }: SearchStatusProps) => {
  if (type === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <Status type="loading" title="검색 중..." size="lg" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <Status
          type="error"
          icon="⚠️"
          title="검색 오류"
          message={error}
          size="md"
        />
      </div>
    );
  }

  if (type === 'emptyResults') {
    return (
      <div className="p-8 text-center">
        <Status
          type="empty"
          icon="📍"
          title="검색에 대한 등록된 결과가 없습니다."
          message="다른 키워드로 검색해보세요"
          size="lg"
        />
      </div>
    );
  }

  return null;
};
