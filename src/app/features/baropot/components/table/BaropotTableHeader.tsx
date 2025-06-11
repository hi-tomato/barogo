import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

export default function BaropotTableHeader() {
  const router = useRouter();

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
      <div className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Button
            text="←"
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
          />
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-[#2B2B2B]">
              전체 바로팟
            </h1>
            <p className="text-sm text-gray-500">
              모든 바로팟을 한눈에 확인하세요
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
