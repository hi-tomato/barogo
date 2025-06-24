import {
  getCategoryIcon,
  getGradientByCategory,
} from "@/app/features/nearby/utils/categoryHelpers";
import { useCreateBaropot } from "@/app/shared/hooks/queries/useBaropot";
import { NearbyRestaurant } from "@/app/shared/types";
import { CreateBaropotRequest } from "@/app/shared/types/baropots";
import {
  ContactMethod,
  ParticipantAgeGroup,
  ParticipantGender,
  PaymentMethod,
} from "@/app/shared/types/enums";
import Button from "@/app/shared/ui/Button";

interface RestaurantListProps {
  restaurants: NearbyRestaurant[];
  onCreateBaropot?: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantList({
  restaurants,
  onCreateBaropot,
}: RestaurantListProps) {
  const createBaropotMutation = useCreateBaropot();

  const handleCreateBaropot = (restaurant: NearbyRestaurant) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    //TODO: Main 내 위치 근처 맛집에서 바로팟을 간단히 만들기 (500 Error)
    const baropotData: CreateBaropotRequest = {
      restaurantId: parseInt(restaurant.id),
      title: `${restaurant.place_name} 바로팟`,
      location: restaurant.address_name || "상세 주소 미정",
      maxParticipants: 4,
      date: tomorrow.toISOString().split("T")[0],
      time: "19:00",
      participantGender: ParticipantGender.ANY,
      participantAgeGroup: ParticipantAgeGroup.ANY,
      contactMethod: ContactMethod.APP_CHAT,
      estimatedCostPerPerson: 15000,
      paymentMethod: PaymentMethod.DUTCH_PAY,
      description: `${restaurant.place_name}에서 함께 맛있는 식사 어떠세요! 🍽️`,
      rule: "매너있게 즐겁게 식사해요! 😊",
      tags: restaurant.category_name
        ? restaurant.category_name.split(" > ").pop()?.split(",") || ["맛집"]
        : ["맛집"],
    };

    createBaropotMutation.mutate(baropotData, {
      onSuccess: () => {
        alert(`✅ ${restaurant.place_name} 바로팟이 생성되었습니다!`);
        if (onCreateBaropot) {
          onCreateBaropot(restaurant);
        }
      },
      onError: (error) => {
        console.error("바로팟 생성 실패:", error);
        alert("❌ 바로팟 생성에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  if (restaurants.length === 0) return null;

  return (
    <div className="space-y-3">
      {restaurants.map((restaurant, index) => (
        <div
          key={restaurant.id || index}
          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-3">
            {/* 카테고리 아이콘 */}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${getGradientByCategory(
                restaurant.category_name
              )} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-white text-lg">
                {getCategoryIcon(restaurant.category_name)}
              </span>
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {restaurant.place_name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {restaurant.category_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {restaurant.address_name}
              </p>
              {restaurant.distance && (
                <p className="text-xs text-blue-600 mt-1">
                  📍 {Math.round(Number(restaurant.distance))}m
                </p>
              )}
              {restaurant.phone && (
                <p className="text-xs text-gray-500">📞 {restaurant.phone}</p>
              )}
            </div>

            <Button
              text="⚡ 바로팟 만들기"
              onClick={() => handleCreateBaropot(restaurant)}
              className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-xs font-medium hover:shadow-md transition-all cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
