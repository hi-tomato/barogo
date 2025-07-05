import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Button } from '@/app/shared/ui';
import { Restaurant } from '@/app/shared/types/restaurant';
import PopupContainer from './popup/PopupContainer';

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
      <div className="relative w-[250px] rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-xl">
        <PopupContainer restaurant={restaurant} />
        <Button
          text="X"
          onClick={onClose}
          variant="text"
          size="icon"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        />
      </div>
    </CustomOverlayMap>
  );
}
