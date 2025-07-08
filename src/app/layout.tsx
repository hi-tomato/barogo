import Script from 'next/script';
import './globals.css';
import QueryProvider from './shared/providers/QueryProvider';
import { ErrorBoundary } from './shared/ui/error-boundary/ErrorBoundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <html lang="ko">
      <body>
        <ErrorBoundary
          onReset={reset}
          onError={(error, errorInfo) => {
            console.error('App Error:', error, errorInfo);
          }}
        >
          <QueryProvider>
            {children}
            {modal}
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
              strategy="beforeInteractive"
            />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
