import Script from 'next/script';
import './globals.css';
import QueryProvider from './shared/providers/QueryProvider';
import ErrorBoundaryProvider from '@/app/shared/providers/ErrorBoundaryProvider';
import ToastContextProvider from '@/app/shared/ui/toast/ToastContext';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Barogo',
  description: '새로운 사람들과 맛집을 함께 즐겨보세요!',
  keywords: '맛집, 공유, 바로팟, 음식, 모임',
  authors: [{ name: 'Barogo Team' }],
  openGraph: {
    title: 'Barogo',
    description: '새로운 사람들과 맛집을 함께 즐겨보세요!',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1076dd',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="http://mts.daumcdn.net" />
        <link rel="dns-prefetch" href="http://mts.daumcdn.net" />
      </head>
      <body>
        <ErrorBoundaryProvider>
          <QueryProvider>
            <ToastContextProvider>
              {children}
              {modal}
            </ToastContextProvider>
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
