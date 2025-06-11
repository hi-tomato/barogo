import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Button from "@/app/shared/ui/Button";
import { Restaurant } from "@/app/shared/types/map";
import PopupContainer from "./popup/PopupContainer";

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
        <PopupContainer restaurant={restaurant} />
        <Button
          text="X"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
        />
      </div>
    </CustomOverlayMap>
  );
}
