'use client';
import { useRouter } from 'next/navigation';
import { HiPlus } from 'react-icons/hi';

export default function FloatingActionButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/restaurants')}
      className="fixed right-4 bottom-24 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1C4E80] text-white shadow-lg transition-all hover:shadow-xl"
    >
      <HiPlus size={24} />
    </button>
  );
}
