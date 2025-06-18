"use client";
import { NearbyRestaurant } from "@/app/shared/types";
import { useRouter } from "next/navigation";
import Button from "@/app/shared/ui/Button";
import {
  useCreateRestaurant,
  useRestaurantList,
} from "@/app/shared/hooks/queries/useRestaurant";
import { RestaurantStatus } from "./Status";

interface RestaurantPreviewModalProps {
  restaurant: NearbyRestaurant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (restaurant: NearbyRestaurant) => void;
}

export default function RestaurantPreviewModal({
  restaurant,
  isOpen,
  onClose,
  onConfirm,
}: RestaurantPreviewModalProps) {
  const router = useRouter();
  const createRestaurant = useCreateRestaurant();

  // 🔧 전체 맛집 리스트를 가져와서 이름으로 매칭
  const { data: restaurantList, isLoading: isLoadingList } =
    useRestaurantList();

  // 🔍 이름과 주소로 기존 맛집 찾기
  const existingRestaurant = restaurantList?.find(
    (item) =>
      item.name === restaurant.place_name ||
      (item.name.includes(restaurant.place_name.split(" ")[0]) &&
        item.address === restaurant.address_name)
  );

  const hasServerData = !!existingRestaurant;
  const isLoading = isLoadingList; // ⭐ 리스트 로딩 상태 사용

  // 상세보기 버튼 클릭
  const handleDetailView = () => {
    if (existingRestaurant) {
      onClose();
      router.push(`/restaurants/${existingRestaurant.id}/detail`);
    }
  };

  // 맛집 등록 버튼 클릭
  const handleRegisterRestaurant = async () => {
    if (!restaurant.x || !restaurant.y) {
      alert("위치 정보가 없어서 맛집을 등록할 수 없습니다.");
      return;
    }
    sessionStorage.setItem(
      "selectedRestaurant",
      JSON.stringify({
        id: restaurant.id,
        name: restaurant.place_name,
        location: restaurant.address_name,
        category: restaurant.category_name,
        phone: restaurant.phone || "",
        x: restaurant.x,
        y: restaurant.y,
      })
    );
    onClose();
    router.push(`/restaurants/create`);
  };

  // 바로팟 만들기 버튼 클릭
  const handleCreateBaropot = () => {
    console.log("바로팟 만들기로 이동");
    onConfirm(restaurant);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">맛집 정보</h3>
          <Button
            text="✕"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          />
        </div>

        {/* 맛집 정보 */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-lg">{restaurant.place_name}</h4>
          <p className="text-sm text-gray-600">{restaurant.category_name}</p>
          <p className="text-sm text-gray-600">📍 {restaurant.address_name}</p>
          {restaurant.road_address_name && (
            <p className="text-sm text-gray-500">
              🛣️ {restaurant.road_address_name}
            </p>
          )}
          {restaurant.phone && (
            <p className="text-sm text-gray-600">📞 {restaurant.phone}</p>
          )}
        </div>

        {/* Action Buttons - 조건별 렌더링 */}
        <div className="space-y-3">
          {/* 로딩 중일 때 */}
          {isLoading && <RestaurantStatus type="isLoading" onClose={onClose} />}

          {/* 서버에 데이터가 있을 때 - 상세보기 + 바로팟 만들기 */}
          {!isLoading && hasServerData && (
            <RestaurantStatus
              type="hasServerData"
              onClose={onClose}
              onDetailView={handleDetailView}
              onCreateBaropot={handleCreateBaropot}
            />
          )}

          {/* 서버에 데이터가 없을 때 - 맛집 등록  */}
          {!isLoading && !hasServerData && (
            <RestaurantStatus
              type="notServerData"
              onClose={onClose}
              onRegisterRestaurant={handleRegisterRestaurant}
              isRegistering={createRestaurant.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
