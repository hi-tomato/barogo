import { SearchPage } from '@/app/features/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 맛있는 맛집을 찾아보세요.',
  description: '맛집들을 검색하여 찾아보세요.',
  keywords: '맛집, 맛집 검색, 음식점',
  openGraph: {
    title: '바로고 검색 페이지',
    description: '맛집들을 검색하여 찾아보세요.',
  },
};

export default function page() {
  return <SearchPage />;
}
