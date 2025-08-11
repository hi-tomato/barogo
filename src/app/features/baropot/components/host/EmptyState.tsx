export function EmptyState({
  type,
  icon: Icon,
}: {
  type: 'pending' | 'approved';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const messages = {
    pending: '대기중인 참가 신청이 없습니다',
    approved: '승인된 참가자가 없습니다',
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">
      <Icon size={40} className="mx-auto mb-3 text-gray-400 opacity-40" />
      <p className="text-sm text-gray-500">{messages[type]}</p>
    </div>
  );
}
