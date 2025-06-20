interface ReviewHeaderProps {
  reviewCount: number;
  showWriteForm: boolean;
  onToggleForm: () => void;
  isSubmitting: boolean;
}

export default function ReviewHeader({
  reviewCount,
  showWriteForm,
  onToggleForm,
  isSubmitting,
}: ReviewHeaderProps) {
  return (
    <div className="px-4 py-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2B2B2B] flex items-center">
            <span className="mr-2">💬</span>
            리뷰 ({reviewCount})
          </h2>
          <p className="text-sm text-[#8A8A8A] mt-1">
            고객님의 솔직한 후기를 남겨주세요!
          </p>
        </div>
        <button
          onClick={onToggleForm}
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
            showWriteForm
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-[#1C4E80] text-white hover:bg-[#154066]"
          }`}
        >
          {isSubmitting ? "등록 중..." : showWriteForm ? "취소" : "리뷰쓰기"}
        </button>
      </div>
    </div>
  );
}
