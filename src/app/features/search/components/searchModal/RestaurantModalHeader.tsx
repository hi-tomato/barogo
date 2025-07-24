import { getCategoryIcon } from '@/app/features/nearby/utils/categoryHelpers';
import { NearbyRestaurant } from '@/app/shared/types';
import { HiX } from 'react-icons/hi';

export default function RestaurantModalHeader({
  restaurant,
  onClose,
}: {
  restaurant: NearbyRestaurant;
  onClose: () => void;
}) {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">
            {getCategoryIcon(restaurant.category_name)}
          </div>
          <div>
            <h3 className="text-lg font-bold">맛집 정보</h3>
            <p className="text-sm text-blue-100">상세 정보를 확인해보세요</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/20 p-2 transition-all duration-200 hover:scale-110 hover:bg-white/30 active:scale-95"
        >
          <HiX size={20} />
        </button>
      </div>
    </div>
  );
}
