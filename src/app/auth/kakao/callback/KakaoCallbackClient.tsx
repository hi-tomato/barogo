'use client';
import { useToast } from '@/app/shared/hooks/useToast';
import { setAccessToken } from '@/app/shared/lib/authToken';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { LoadingSpinner } from '@/app/shared/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function KakaoCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialize } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const handleKakaoCallback = async () => {
      if (accessToken) {
        try {
          setAccessToken(accessToken);
          await initialize();
          toast.success('카카오 로그인을 성공하였습니다.');
          router.push('/main');
        } catch (err) {
          console.error('카카오 로그인을 실패하였습니다.', err);
        }
      }
    };

    handleKakaoCallback();
  }, [searchParams, initialize, router, toast]);

  return <LoadingSpinner />;
}
