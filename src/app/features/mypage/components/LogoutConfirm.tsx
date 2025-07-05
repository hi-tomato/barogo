import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { useLogout } from '@/app/shared/hooks/queries/useAuth';
import { LoadingSpinner } from '@/app/shared/ui';

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  logout: ReturnType<typeof useLogout>;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        {/* 모달 헤더 */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-red-500">🚪</span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">로그아웃</h3>
          <p className="text-sm text-gray-600">
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
            className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex flex-1 items-center justify-center rounded-lg bg-red-500 py-3 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
          >
            {logout.isPending ? (
              <>
                <LoadingSpinner size="sm" color="white" inline />
                <span className="ml-2">처리중...</span>
              </>
            ) : (
              '로그아웃'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
