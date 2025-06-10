import { Restaurant } from "@/app/types/map";
import Button from "@/app/shared/ui/Button";

export default function PopupActions({
  restaurants,
}: {
  restaurants: Restaurant;
}) {
  const handleDetailPage = () => {
    // TODO: 여기서 디테일 페이지로 이동하는 로직을 작성
    alert("상세 페이지로 이동");
  };
  const handleBaropotPage = () => {
    // TODO: 여기서 바로팟 페이지로 이동하는 로직을 작성
    alert("바로팟 참여하기");
  };

  return (
    <div className="flex gap-2">
      <Button
        text="상세보기"
        onClick={handleDetailPage}
        className="flex-1 text-center bg-gray-100 text-gray-700 text-xs py-2 rounded-lg hover:bg-gray-200 transition"
      />
      {restaurants.hasBaropot && (
        <Button
          text="바로팟 참여 🔥"
          onClick={handleBaropotPage}
          className="flex-1 text-center bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs py-2 rounded-lg hover:shadow-md transition"
        />
      )}
    </div>
  );
}
