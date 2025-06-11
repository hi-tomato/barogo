"use client";
import { Restaurant } from "@/app/shared/types/map";
import Button from "@/app/shared/ui/Button";
import { useRouter } from "next/navigation";

export default function PopupActions({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const router = useRouter();
  const handleDetailPage = () => {
    // TODO: 여기서 디테일 페이지로 이동하는 로직을 작성
    console.log("맵 컴포넌트에서, 디테일 페이지로 이동");
    router.push(`/search/${restaurant.id}/detail`);
  };

  const handleBaropotPage = () => {
    // TODO: 여기서 바로팟 페이지로 이동하는 로직을 작성
    router.push(`/baropot/create/${restaurant.id}`);
    console.log("맵 컴포넌트에서, 바로팟 생성 페이지로 이동");
  };

  return (
    <div className="flex gap-2">
      <Button
        text="상세보기"
        onClick={handleDetailPage}
        className="flex-1 text-center bg-gray-100 text-gray-700 text-xs py-2 rounded-lg hover:bg-gray-200 transition"
      />
      {restaurant.hasBaropot && (
        <Button
          text="바로팟 참여 🔥"
          onClick={handleBaropotPage}
          className="flex-1 text-center bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs py-2 rounded-lg hover:shadow-md transition"
        />
      )}
    </div>
  );
}
