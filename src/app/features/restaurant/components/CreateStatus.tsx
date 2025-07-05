import { Status } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';

export default function CreateStatus({ type }: { type: string }) {
  const router = useRouter();
  if (type === 'isLoading') {
    return (
      <Status type="loading" size="lg" message="맛집 정보를 불러오는 중..." />
    );
  }
  if (type === 'notFound') {
    return (
      <Status
        type="error"
        title="맛집 정보를 찾을 수 없습니다."
        action={{ label: '돌아가기', onClick: () => router.back() }}
        size="lg"
      />
    );
  }
  if (type === 'basicMessage') {
    return (
      <Status
        type="custom"
        icon={<span className="flex-shrink-0 text-lg text-blue-600">💡</span>}
        title="맛집 등록 안내"
        message={
          <>
            등록된 맛집은 다른 사용자들도 볼 수 있으며, 바로팟 생성 시 선택할 수
            있습니다.
            <br />
            정확하고 유용한 정보를 입력해주세요!
          </>
        }
        size="md"
      />
    );
  }
  return null;
}
