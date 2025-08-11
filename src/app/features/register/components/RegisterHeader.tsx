import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

export default function RegisterHeader() {
  const router = useRouter();

  return (
    <div className="absolute top-0 right-0 left-0 z-20 p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-[#1C4E80] transition-colors hover:text-[#154066]"
      >
        <BsArrowLeft className="h-3 w-3" />
        <span className="font-suit text-sm">뒤로</span>
      </button>
    </div>
  );
}
