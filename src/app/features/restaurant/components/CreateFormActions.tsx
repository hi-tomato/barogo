"use client";
import { Button } from "@/app/shared/ui";
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
      <Button
        type="submit"
        disabled={isPending || !isFormValid}
        onClick={onSubmit}
        variant="primary"
        size="lg"
        fullWidth
        loading={isPending}
      >
        {isPending ? "등록 중..." : "맛집 등록하기"}
      </Button>

      <Button
        onClick={() => router.back()}
        disabled={isPending}
        variant="outline"
        size="lg"
        fullWidth
      >
        취소
      </Button>
    </div>
  );
}
