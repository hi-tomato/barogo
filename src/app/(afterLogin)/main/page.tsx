import MainBanner from "@/app/components/main/MainBanner";
import MainHeader from "@/app/components/main/MainHeader";
import MainHeadingText from "@/app/components/main/MainHeadingText";
import MainTabMenu from "@/app/components/main/MainTabMenu";
import React from "react";

export default function MainPages() {
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <MainHeader />
      {/* Contents */}
      <div className="px-4 py-6">
        <MainHeadingText />
        <MainTabMenu />
        <MainBanner />
      </div>
    </div>
  );
}
