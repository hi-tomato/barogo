"use client";
import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

interface CreateFormActionsProps {
  isPending: boolean;
  isFormValid: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CreateFormActions({
  isPending,
  isFormValid,
  onSubmit,
}: CreateFormActionsProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={isPending || !isFormValid}
        onClick={onSubmit}
        className="w-full bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            <span>등록 중...</span>
          </>
        ) : (
          <>
            <span>맛집 등록하기</span>
          </>
        )}
      </button>

      <Button
        onClick={() => router.back()}
        disabled={isPending}
        className="w-full border border-gray-300 text-gray-700 font-medium py-4 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        취소
      </Button>
    </div>
  );
}
