'use client';
import { useRouter } from 'next/navigation';
import { HiPlus } from 'react-icons/hi';
import { Header } from '@/app/shared/ui';

export default function BaropotHeader() {
  const router = useRouter();

  return (
    <Header
      title="바로팟"
      rightContent={
        <button
          onClick={() => router.push('/restaurants')}
          className="rounded-lg p-2 text-[#1C4E80] transition-colors hover:bg-blue-50"
        >
          <HiPlus size={24} />
        </button>
      }
    />
  );
}
