// import MainHeadingText from '@/app/features/main/components/MainHeadingText';
import MainTabMenu from '@/app/features/main/components/MainTabMenu';
import MainBanner from '@/app/features/main/components/MainBanner';
import LiveBaropotStatus from '@/app/features/main/components/LiveBaropotStatus';
import PopularRestaurants from '@/app/features/main/components/PopularRestaurants';
import CategoryExplorer from '@/app/features/main/components/CategoryExplorer';
import NewRestaurants from '@/app/features/main/components/NewRestaurants';

export default function MainContentsPage() {
  return (
    <div className="space-y-6">
      {/* 메인 메뉴 (기존 3개 카드) */}
      <MainTabMenu />

      {/* 실시간 바로팟 현황 */}
      <LiveBaropotStatus />

      {/* 오늘의 인기 맛집 */}
      <PopularRestaurants />

      {/* 카테고리별 탐색 */}
      <CategoryExplorer />

      {/* 새로 등록된 맛집 */}
      <NewRestaurants />

      {/* 팁 섹션 */}
      <MainBanner />
    </div>
  );
}
