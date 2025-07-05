import { Button } from '@/app/shared/ui';

interface BaropotHeaderProps {
  onClose: () => void;
  onRefresh?: () => void;
}

export default function BaropotHeader({
  onClose,
  onRefresh,
}: BaropotHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">바로팟 현황</h2>
        <p className="mt-1 text-sm text-gray-500">
          실시간 모임 현황을 확인하세요
        </p>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            text="🔄"
            onClick={onRefresh}
            variant="outline"
            size="icon"
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          />
        )}
        <Button
          text="×"
          onClick={onClose}
          variant="text"
          size="icon"
          className="text-gray-400 hover:bg-gray-100"
        />
      </div>
    </div>
  );
}
