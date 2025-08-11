import { Metadata } from 'next';
import BaropotEditContainer from '@/app/features/baropotEdit/components/BaropotEditContainer';

export const metadata: Metadata = {
  title: '바로고 | 바로팟 수정',
  description: '바로팟 정보를 수정해보세요.',
};

export default function BaropotEditPage() {
  return <BaropotEditContainer />;
}
