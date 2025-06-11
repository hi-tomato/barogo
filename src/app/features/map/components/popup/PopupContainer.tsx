import PopupContents from "./PopupContents";
import PopupHeader from "./PopupHeader";
import PopupActions from "./PopupActions";
import { Restaurant } from "@/app/shared/types/map";

export default function PopupContainer({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <>
      <PopupHeader restaurant={restaurant} />
      <PopupContents restaurant={restaurant} />
      <PopupActions restaurant={restaurant} />
    </>
  );
}
