import RestaurantHeader from "@/app/components/restaurant/RestaurantHeader";
import RestaurantImages from "@/app/components/restaurant/RestaurantImages";
import RestaurantInfo from "@/app/components/restaurant/RestaurantInfo";
import RestaurantMap from "@/app/components/restaurant/RestaurantMap";
import RestaurantReviews from "@/app/components/restaurant/RestaurantReviews";
import RestaurantSection from "@/app/components/restaurant/RestaurantSection";

export default function DetailPage() {
  return (
    <div>
      <RestaurantHeader />
      <RestaurantImages />
      <RestaurantInfo />
      <RestaurantReviews />
      <RestaurantSection />
      <RestaurantMap />
    </div>
  );
}
