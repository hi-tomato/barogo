import { Restaurant } from '@/app/shared/types/restaurant';

export default function PopupContents({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const description =
    restaurant.description.length > 30
      ? restaurant.description.slice(0, 15) + ' ...'
      : restaurant.description;
  return (
    <>
      <div className="mb-2 flex items-center gap-1">
        <span className="text-yellow-500">⭐</span>
        <span className="text-sm font-medium">{restaurant.rating}</span>
        <span className="text-xs text-gray-400">
          ({restaurant.reviewCount}개 리뷰)
        </span>
      </div>
      {/* 설명 */}
      <p className="mb-3 line-clamp-2 text-sm text-gray-600">{description}</p>

      {/* 바로팟 정보 */}
      {restaurant.hasBaropot && (
        <div className="mb-3 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-orange-600">
              🔥 진행중인 바로팟
            </div>
            <span className="text-sm font-bold text-orange-600">
              {restaurant.baropotCount || 1}명
            </span>
          </div>
          <div className="mt-1 text-xs text-orange-500">
            지금 바로팟에 참석해보세요!
          </div>
        </div>
      )}
    </>
  );
}
