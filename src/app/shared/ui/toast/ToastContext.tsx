'use client';
import React, { createContext, useState } from 'react';

export enum TOAST_TYPES {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

interface Toast {
  id: number;
  message: string;
  type: TOAST_TYPES;
  duration: number;
}

interface ToastContextProps {
  toasts: Toast[];
  showToast: (message: string, type: TOAST_TYPES, duration: number) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export default function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: TOAST_TYPES,
    duration: number = 2000
  ) => {
    const id = Date.now() + Math.random();

    const toast = { id, message, type, duration };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
