'use client';
import React from 'react';
import { ErrorBoundary } from '../ui/error-boundary/ErrorBoundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}
export default function ErrorBoundaryProvider({
  children,
}: ErrorBoundaryProviderProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
