import MyPageContainer from '@/app/features/mypage/components/MyPageContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 마이페이지',
  description: '마이페이지에서 내 정보를 관리해보세요.',
};

export default function MyPage() {
  return (
    <div className="min-h-screen bg-[#E6EEF5] pb-24">
      <MyPageContainer />
    </div>
  );
}
