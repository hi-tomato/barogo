import { Metadata } from 'next';
import BaropotCreateContainer from '@/app/features/baropotCreate/components/BaropotCreateContainer';

export const metadata: Metadata = {
  title: '바로고 | 바로팟 만들기',
  description: '새로운 바로팟을 만들어보세요.',
};

export default function CreateRestaurantBaropotPage() {
  return <BaropotCreateContainer />;
}
