import Script from "next/script";
import "./globals.css";
import QueryProvider from "./shared/providers/QueryProvider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          {modal}
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          />
        </QueryProvider>
      </body>
    </html>
  );
}
