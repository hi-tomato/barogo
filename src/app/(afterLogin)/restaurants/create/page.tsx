import CreateContainer from '@/app/features/restaurant/components/CreateContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 맛집 추가하기',
  description: '맛집을 추가하여 바로고에 등록해보세요.',
};

export default function page() {
  return (
    <>
      <CreateContainer />
    </>
  );
}
