import MainHeader from '@/app/features/main/components/MainHeader';
import MainContentsPage from '@/app/features/main/page/MainContentsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 나와 취향이 맞는분들과 맛집 투어를 함께 해요.',
  description: '맛집 컨텐츠를 제공하는 바로고 메인 페이지 입니다.',
  keywords: '맛집, 맛집 추천, 음식점, 바로고',
  openGraph: {
    title: '바로고 메인 페이지',
    description: '맛집 컨텐츠를 제공하는 바로고 메인 페이지 입니다.',
  },
};

export default function MainPages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <MainHeader />

      <div className="px-4 py-6">
        <MainContentsPage />
      </div>
    </div>
  );
}
