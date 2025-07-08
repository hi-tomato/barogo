'use client';
import { setAccessToken } from '@/app/shared/lib/authToken';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { LoadingSpinner } from '@/app/shared/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function KaKaoCallBack() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialize } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const handleKakaoCallback = async () => {
      if (accessToken) {
        try {
          setAccessToken(accessToken);
          await initialize();
          alert('카카오 로그인을 성공하였습니다.');
          router.push('/main');
        } catch (err) {
          console.error('카카오 로그인을 실패하였습니다.', err);
        }
      }
    };

    handleKakaoCallback();
  }, [searchParams, initialize, router]);

  return <LoadingSpinner />;
}
