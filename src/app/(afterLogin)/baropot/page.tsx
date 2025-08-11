import BaropotContainer from '@/app/features/baropot/components/main/BaropotContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로고 | 진행중인 바로팟을 확인해보세요',
  description: '진행중인 바로팟을 확인해보세요.',
};

export default function BaropotMainPage() {
  return <BaropotContainer />;
}
