import Button from '@/app/shared/ui/Button';

export const FoodErrorFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#E6EEF5]">
    <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-md">
      <div className="mb-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1C4E80]/10">
          🍽️
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">
        맛집을 찾을 수 없어요
      </h3>

      <p className="mb-6 text-sm text-[#8A8A8A]">잠시 후 다시 시도해주세요</p>

      <Button text="재시도" className="bg-[#1C4E80] hover:bg-[#1C4E80]/90" />
    </div>
  </div>
);
