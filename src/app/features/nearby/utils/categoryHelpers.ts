import { RestaurantCategory } from "@/app/shared/types/enums";
import { getCategoryDisplayName } from "@/app/shared/lib/kakaoCategory";

export const getCategoryIcon = (categoryName: string) => {
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.KOREAN)))
    return "🍚";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.CHINESE)))
    return "🥢";
  if (
    categoryName.includes(getCategoryDisplayName(RestaurantCategory.JAPANESE))
  )
    return "🍣";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.WESTERN)))
    return "🍝";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.CAFE)))
    return "☕";
  if (categoryName.includes("치킨")) return "🍗";
  if (categoryName.includes("피자")) return "🍕";
  if (categoryName.includes("햄버거")) return "🍔";
  return "🍽️";
};

export const getGradientByCategory = (categoryName: string) => {
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.KOREAN)))
    return "from-red-400 to-orange-500";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.CHINESE)))
    return "from-yellow-400 to-red-500";
  if (
    categoryName.includes(getCategoryDisplayName(RestaurantCategory.JAPANESE))
  )
    return "from-blue-400 to-green-500";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.WESTERN)))
    return "from-purple-400 to-pink-500";
  if (categoryName.includes(getCategoryDisplayName(RestaurantCategory.CAFE)))
    return "from-amber-400 to-orange-500";
  return "from-gray-400 to-gray-600";
};
