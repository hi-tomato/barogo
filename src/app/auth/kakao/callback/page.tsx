import { Suspense } from 'react';
import KakaoCallbackClient from './KakaoCallbackClient';

export default function KaKaoCallBackPage() {
  return (
    <Suspense fallback={null}>
      <KakaoCallbackClient />
    </Suspense>
  );
}
