import { Button } from '@/app/shared/ui';

type BaropotTab = 'available' | 'joined' | 'created';
interface BaropotTabsProps {
  activeTab: BaropotTab;
  onTabChange: (tab: BaropotTab) => void;
}

const tabs = [
  { id: 'available' as const, label: '참여 가능한 모임' },
  { id: 'joined' as const, label: '참여한 모임' },
  { id: 'created' as const, label: '내가 만든 모임' },
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
          variant={activeTab === tab.id ? 'primary' : 'outline'}
          size="sm"
          className={`flex-1 py-3 text-sm font-medium`}
        />
      ))}
    </div>
  );
}
