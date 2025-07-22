'use client';
import { useContext } from 'react';
import { TOAST_TYPES, ToastContext } from '@/app/shared/ui/toast/ToastContext';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastContextProvider');
  }

  const { showToast } = context;

  return {
    success: (message: string, duration?: number) =>
      showToast(message, TOAST_TYPES.SUCCESS, duration ?? 2000),
    error: (message: string, duration?: number) =>
      showToast(message, TOAST_TYPES.ERROR, duration ?? 2000),
    warning: (message: string, duration?: number) =>
      showToast(message, TOAST_TYPES.WARNING, duration ?? 2000),
    info: (message: string, duration?: number) =>
      showToast(message, TOAST_TYPES.INFO, duration ?? 2000),
  };
};
