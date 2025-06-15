interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  logout: {
    mutate: () => void;
    isPending: boolean;
  };
}

export default function LogoutConfirm({
  isOpen,
  onClose,
  logout,
}: ConfirmProps) {
  const handleLogout = () => {
    onClose();
    logout.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
        {/* 모달 헤더 */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">🚪</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">로그아웃</h3>
          <p className="text-gray-600 text-sm">
            정말 로그아웃 하시겠습니까?
            <br />
            <span className="text-xs text-gray-500">
              다시 로그인하셔야 합니다.
            </span>
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={logout.isPending}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {logout.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                처리중...
              </>
            ) : (
              "로그아웃"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
