import HashtagSection from "@/app/components/search/HashtagSection";
import PromotionBanner from "@/app/components/search/PromotionBanner";
import RecommendedSearches from "@/app/components/search/RecommendedSearches";
import SearchHeader from "@/app/components/search/SearchHeader";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <SearchHeader />
      <div className="px-4 py-6 space-y-8">
        <RecommendedSearches />
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            어떤 매장을 찾으세요?
          </h2>
        </div>
        <PromotionBanner />
        <HashtagSection />
      </div>
    </div>
  );
}
