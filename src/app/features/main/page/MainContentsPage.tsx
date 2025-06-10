import MainHeadingText from "@/app/features/main/components/MainHeadingText";
import MainTabMenu from "@/app/features/main/components/MainTabMenu";
import MainBanner from "@/app/features/main/components/MainBanner";

export default function MainContentsPage() {
  return (
    <div>
      <MainHeadingText />
      <MainTabMenu />
      <MainBanner />
    </div>
  );
}
