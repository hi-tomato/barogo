import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Button from "@/app/shared/ui/Button";

import { Restaurant } from "@/app/shared/types/map";
import PopupHeader from "./popup/PopupHeader";
import PopupContents from "./popup/PopupContents";
import PopupActions from "./popup/PopupActions";

interface RestaurantPopupProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export default function RestaurantPopup({
  restaurant,
  onClose,
}: RestaurantPopupProps) {
  return (
    <CustomOverlayMap position={{ lat: restaurant.lat, lng: restaurant.lng }}>
      <div className="relative w-[250px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-sm">
        {/* 헤더 */}
        <PopupHeader restaurant={restaurant} />
        {/* Contents */}
        <PopupContents restaurant={restaurant} />
        {/* Actions */}
        <PopupActions restaurants={restaurant} />
        {/* 닫기 버튼 */}
        <Button
          text="X"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
        />
      </div>
    </CustomOverlayMap>
  );
}
