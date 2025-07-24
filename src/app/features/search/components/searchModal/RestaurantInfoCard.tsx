import { NearbyRestaurant } from '@/app/shared/types';
import { HiLocationMarker, HiPhone, HiTag } from 'react-icons/hi';

interface InfoCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  content: string;
  subContent?: string;
  animationDelay?: string;
}

export default function RestaurantInfoCard({
  restaurant,
}: {
  restaurant: NearbyRestaurant;
}) {
  return (
    <div className="space-y-6">
      {/* 맛집 이름과 카테고리 */}
      <div
        className="animate-fadeInUp text-center"
        style={{ animationDelay: '0.1s' }}
      >
        <h4 className="mb-2 text-xl font-bold text-gray-900">
          {restaurant.place_name}
        </h4>
        <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          <HiTag size={16} />
          <span>{restaurant.category_name}</span>
        </div>
      </div>

      {/* 정보 카드들 */}
      <div className="space-y-3">
        {/* 주소 카드 */}
        <InfoCard
          icon={<HiLocationMarker size={20} className="text-blue-600" />}
          iconBg="bg-blue-100"
          title="주소"
          content={restaurant.address_name}
          subContent={
            restaurant.road_address_name
              ? `🛣️ ${restaurant.road_address_name}`
              : undefined
          }
          animationDelay="0.2s"
        />

        {/* 전화번호 카드 */}
        {restaurant.phone && (
          <InfoCard
            icon={<HiPhone size={20} className="text-green-600" />}
            iconBg="bg-green-100"
            title="전화번호"
            content={restaurant.phone}
            animationDelay="0.3s"
          />
        )}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  iconBg,
  title,
  content,
  subContent,
  animationDelay = '0s',
}: InfoCardProps) {
  return (
    <div
      className="animate-fadeInLeft flex items-start space-x-3 rounded-xl bg-gray-50 p-4"
      style={{ animationDelay }}
    >
      <div className={`flex-shrink-0 rounded-lg ${iconBg} p-2`}>{icon}</div>
      <div className="flex-1">
        <p className="mb-1 text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{content}</p>
        {subContent && (
          <p className="mt-1 text-xs text-gray-500">{subContent}</p>
        )}
      </div>
    </div>
  );
}
