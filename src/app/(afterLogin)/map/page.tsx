import KaKaoContainer from '@/app/features/map/components/KaKaoContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 맛집이 고민이라면 지도에서 찾아보세요.',
  description: '맛집을 검색하여 찾아보세요.',
  keywords: '지도, 맛집 검색',
};

export default function KakaoMapView() {
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <KaKaoContainer />
    </div>
  );
}
