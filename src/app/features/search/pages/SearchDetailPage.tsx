import RestaurantHeader from "../components/detail/RestaurantHeader";
import RestaurantImages from "../components/detail/RestaurantImages";
import RestaurantInfo from "../components/detail/RestaurantInfo";
import RestaurantReviews from "../components/detail/RestaurantReviews";
import RestaurantSection from "../components/detail/RestaurantSection";
import RestaurantMap from "../components/detail/RestaurantMap";

export default function SearchDetailPage() {
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
