import { Restaurant } from '@/app/shared/types/restaurant';
import { HiStar, HiLocationMarker, HiClock } from 'react-icons/hi';

export default function PopupHeader({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="mb-4">
      {/* 맛집 이름과 카테고리 */}
      <div className="mb-3">
        <h3 className="mb-2 text-lg leading-tight font-bold text-gray-900">
          {restaurant.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            🍽️ {restaurant.category}
          </span>
          {restaurant.rating && (
            <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
              <HiStar className="mr-1 h-3 w-3 fill-current" />
              {restaurant.rating}
            </span>
          )}
        </div>
      </div>

      {/* 위치 정보 */}
      <div className="mb-2 flex items-start gap-2">
        <HiLocationMarker className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
        <p className="text-sm leading-relaxed text-gray-600">
          {restaurant.address}
        </p>
      </div>

      {/* 영업시간 (있는 경우) */}
      {restaurant.openingTime && restaurant.closingTime && (
        <div className="flex items-center gap-2">
          <HiClock className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <span className="text-sm text-gray-600">
            {restaurant.openingTime} - {restaurant.closingTime}
          </span>
        </div>
      )}
    </div>
  );
}
