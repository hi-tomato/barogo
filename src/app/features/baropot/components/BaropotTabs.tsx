import { BaropotTab } from "@/app/features/baropot/types/baropot";
import Button from "@/app/components/ui/Button";

interface BaropotTabsProps {
  activeTab: BaropotTab;
  onTabChange: (tab: BaropotTab) => void;
}

const tabs = [
  { id: "available" as const, label: "참여 가능한 모임" },
  { id: "joined" as const, label: "참여한 모임" },
  { id: "created" as const, label: "내가 만든 모임" },
];

export default function BaropotTabs({
  activeTab,
  onTabChange,
}: BaropotTabsProps) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          text={tab.label}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        />
      ))}
    </div>
  );
}
