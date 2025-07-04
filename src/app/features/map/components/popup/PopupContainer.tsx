import PopupContents from "./PopupContents";
import PopupHeader from "./PopupHeader";
import PopupActions from "./PopupActions";
import { RestaurantMap } from "@/app/shared/types";

export default function PopupContainer({
  restaurant,
}: {
  restaurant: RestaurantMap;
}) {
  return (
    <>
      <PopupHeader restaurant={restaurant} />
      <PopupContents restaurant={restaurant} />
      <PopupActions restaurant={restaurant} />
    </>
  );
}
