"use client";
import { HiHome, HiMap, HiLightningBolt, HiUser } from "react-icons/hi";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

export default function BottomTabBar() {
  const activeSegment = useSelectedLayoutSegment();
  const tabs = [
    { id: "main", icon: HiHome, label: "홈", path: "/main" },
    { id: "map", icon: HiMap, label: "지도", path: "/map" },
    {
      id: "baropot",
      icon: HiLightningBolt,
      label: "바로팟 생성",
      path: "/baropot/new/create",
    },
    { id: "mypage", icon: HiUser, label: "마이", path: "/mypage" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, icon: Icon, label, path }) => {
          const isActive = activeSegment === id;

          return (
            <Link
              key={id}
              href={path}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                isActive
                  ? "text-[#1C4E80]"
                  : "text-[#8A8A8A] hover:text-[#1C4E80]"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-all ${
                  isActive ? "bg-[#E6EEF5] scale-110" : ""
                }`}
              >
                <Icon size={22} />
              </div>
              <span
                className={`text-xs font-suit font-medium ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-[#1C4E80] rounded-full absolute -bottom-1"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
