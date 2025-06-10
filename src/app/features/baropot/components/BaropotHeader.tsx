import Button from "@/app/shared/ui/Button";

interface BaropotHeaderProps {
  onClose: () => void;
  onRefresh?: () => void;
}

export default function BaropotHeader({
  onClose,
  onRefresh,
}: BaropotHeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-100">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">바로팟 현황</h2>
        <p className="text-sm text-gray-500 mt-1">
          실시간 모임 현황을 확인하세요
        </p>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            text="🔄"
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          />
        )}
        <Button
          text="×"
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
        />
      </div>
    </div>
  );
}
