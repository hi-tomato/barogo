import { RestaurantDetail } from '../types/restaurant';

export const formatTime = (time: string) => {
  if (!time) return '정보 없음';
  return time;
};

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return '정보 없음';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const isCurrentlyOpen = (restaurant: RestaurantDetail) => {
  if (!restaurant.openingTime || !restaurant.closingTime) return null;

  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  const openTime = parseInt(restaurant.openingTime.replace(':', ''));
  const closeTime = parseInt(restaurant.closingTime.replace(':', ''));

  return currentTime >= openTime && currentTime <= closeTime;
};
