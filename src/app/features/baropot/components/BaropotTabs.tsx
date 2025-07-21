import { Button } from '@/app/shared/ui';
import { BaropotTab } from '@/app/features/baropot/types/baropot';

interface BaropotTabsProps {
  activeTab: BaropotTab;
  onTabChange: (tab: BaropotTab) => void;
}

const TAB_MENU = [
  { id: BaropotTab.AVAILABLE, label: '참여 가능한 모임' },
  { id: BaropotTab.JOINED, label: '참여한 모임' },
  { id: BaropotTab.CREATED, label: '내가 만든 모임' },
];

export default function BaropotTabs({
  activeTab,
  onTabChange,
}: BaropotTabsProps) {
  return (
    <div className="flex border-b border-gray-100">
      {TAB_MENU.map((tab) => (
        <Button
          key={tab.id}
          text={tab.label}
          onClick={() => onTabChange(tab.id)}
          variant={activeTab === tab.id ? 'primary' : 'outline'}
          size="sm"
          className={`flex-1 py-3 text-sm font-medium`}
        />
      ))}
    </div>
  );
}
