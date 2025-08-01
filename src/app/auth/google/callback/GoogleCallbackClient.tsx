'use client';
import { useToast } from '@/app/shared/hooks/useToast';
import { setAccessToken } from '@/app/shared/lib/authToken';
import { useAuthStore } from '@/app/shared/store/useAuthStore';
import { LoadingSpinner } from '@/app/shared/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialize } = useAuthStore();
  const toast = useToast();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const accessToken = searchParams.get('accessToken');

      if (accessToken) {
        try {
          setAccessToken(accessToken);
          await initialize();
          toast.success('로그인 완료');
          router.push('/main');
        } catch {
          toast.error('로그인 처리 중 오류가 발생하였습니다');
        }
      }
    };
    handleGoogleCallback();
  }, [searchParams]);

  return <LoadingSpinner />;
}
