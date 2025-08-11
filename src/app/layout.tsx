import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from './shared/providers/QueryProvider';
import ErrorBoundaryProvider from './shared/providers/ErrorBoundaryProvider';
import { checkEnvironmentVariables } from './shared/lib/envCheck';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Barogo',
  description: '바로팟 서비스',
};

// 환경 변수 확인 (클라이언트에서만 실행)
if (typeof window !== 'undefined') {
  checkEnvironmentVariables();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ErrorBoundaryProvider>
          <QueryProvider>{children}</QueryProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  );
}
