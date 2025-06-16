import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

interface ReviewStatusProps {
  type: "isLoading" | "notFound";
}

export default function ReviewStatus({ type }: ReviewStatusProps) {
  const router = useRouter();
  const renderMessage = () => {
    switch (type) {
      case "isLoading":
        return (
          <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">맛집 정보를 불러오는 중...</p>
            </div>
          </div>
        );
      case "notFound":
        return (
          <div className="min-h-screen bg-[#E6EEF5] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">맛집 정보를 찾을 수 없습니다.</p>
              <Button
                text="돌아가기"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return <>{renderMessage()}</>;
}
