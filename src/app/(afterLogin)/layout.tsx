'use client';
import React, { ReactNode, useEffect } from 'react';
import BottomTabBar from '@/app/features/main/components/Footer';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { ErrorBoundary } from '../shared/ui/error-boundary/ErrorBoundary';
import ToastContainer from '../shared/ui/toast/ToastContainer';

export default function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ErrorBoundary>
      <div>
        <main className="pb-20">{children}</main>
        <BottomTabBar />
        {modal}
      </div>
      <ToastContainer />
    </ErrorBoundary>
  );
}
