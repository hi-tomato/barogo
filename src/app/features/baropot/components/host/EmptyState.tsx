export function EmptyState({
  type,
  icon: Icon,
}: {
  type: "pending" | "approved";
  icon: React.ComponentType<any>;
}) {
  const messages = {
    pending: "대기중인 참가 신청이 없습니다",
    approved: "승인된 참가자가 없습니다",
  };

  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
      <Icon size={48} className="mx-auto mb-4 opacity-30 text-[#8A8A8A]" />
      <p className="text-[#8A8A8A]">{messages[type]}</p>
    </div>
  );
}
