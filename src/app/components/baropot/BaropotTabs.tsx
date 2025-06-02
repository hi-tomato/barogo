import { BaropotTab } from "@/app/types";

interface BaropotTabsProps {
  activeTab: BaropotTab;
  onTabChange: (tab: BaropotTab) => void;
}

const tabs = [
  { id: "ongoing" as const, label: "진행중인 모임" },
  { id: "upcoming" as const, label: "예정된 모임" },
  { id: "my" as const, label: "내 모임" },
];

export default function BaropotTabs({
  activeTab,
  onTabChange,
}: BaropotTabsProps) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
