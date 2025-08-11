import { RestaurantCategory } from '@/app/shared/types/enums';

export const restaurantCategoryKorean = {
  [RestaurantCategory.KOREAN]: '한식',
  [RestaurantCategory.CHINESE]: '중식',
  [RestaurantCategory.JAPANESE]: '일식',
  [RestaurantCategory.ASIAN]: '아시안',
  [RestaurantCategory.WESTERN]: '양식',
  [RestaurantCategory.MEXICAN]: '멕시칸',
  [RestaurantCategory.CAFE]: '카페',
  [RestaurantCategory.DESSERT]: '디저트',
  [RestaurantCategory.BAR]: '술집',
  [RestaurantCategory.BUFFET]: '뷔페',
  [RestaurantCategory.FUSION]: '퓨전',
  [RestaurantCategory.VEGAN]: '비건',
  [RestaurantCategory.FAST_FOOD]: '패스트푸드',
} as const;

export const VALID_CATEGORIES = Object.values(RestaurantCategory);

export const isValidCategory = (category: string): boolean => {
  return VALID_CATEGORIES.includes(category as RestaurantCategory);
};

export const getCategoryDisplayName = (category: string): string => {
  return restaurantCategoryKorean[category as RestaurantCategory] || '기타';
};
