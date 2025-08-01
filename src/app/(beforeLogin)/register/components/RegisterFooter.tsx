'use client';
import { useRouter } from 'next/navigation';

export default function RegisterFooter() {
  const router = useRouter();

  return (
    <div className="mt-6 text-center">
      <p className="font-suit text-sm text-[#8A8A8A]">
        이미 계정이 있으신가요?{' '}
        <button
          onClick={() => router.push('/login')}
          className="font-suit text-[#1C4E80] hover:underline"
        >
          로그인하기
        </button>
      </p>
    </div>
  );
}
