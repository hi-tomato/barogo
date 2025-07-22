'use client';
import React, { useContext } from 'react';
import Toast from './Toast';
import { ToastContext } from './ToastContext';

export default function ToastContainer() {
  const context = useContext(ToastContext);

  if (!context) return null;

  const { toasts, removeToast } = context;

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(({ id, message, type }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}
