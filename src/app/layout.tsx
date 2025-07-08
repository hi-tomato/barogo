import Script from 'next/script';
import './globals.css';
import QueryProvider from './shared/providers/QueryProvider';
import ErrorBoundaryProvider from '@/app/shared/providers/ErrorBoundaryProvider';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ErrorBoundaryProvider>
          <QueryProvider>
            {children}
            {modal}
            <Script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
              strategy="beforeInteractive"
            />
          </QueryProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  );
}
