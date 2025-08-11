'use client';
import { useState } from 'react';
import { useLogout } from '@/app/shared/hooks/queries/useAuth';
import LogoutConfirm from '@/app/features/mypage/components/LogoutConfirm';
import Button from '@/app/shared/ui/Button';

export default function LogoutSection() {
  const logout = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <Button
        text={logout.isPending ? '로그아웃 중...' : '로그아웃'}
        onClick={() => setShowLogoutModal(true)}
        disabled={logout.isPending}
        className="w-full rounded-xl py-4 font-medium"
      />

      {showLogoutModal && (
        <LogoutConfirm
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          logout={logout}
        />
      )}
    </>
  );
}
