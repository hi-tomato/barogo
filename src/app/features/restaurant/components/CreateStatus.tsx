import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

interface CreateStatusProps {
  type: "isLoading" | "notFound" | "basicMessage";
}

export default function CreateStatus({ type }: CreateStatusProps) {
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
      case "basicMessage":
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg flex-shrink-0">💡</span>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">맛집 등록 안내</p>
                <p>
                  등록된 맛집은 다른 사용자들도 볼 수 있으며, 바로팟 생성 시
                  선택할 수 있습니다. 정확하고 유용한 정보를 입력해주세요!
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return <>{renderMessage()}</>;
}
