import { Metadata } from 'next';
import LandingContainer from '../features/landing/components/LandingContainer';

export const metadata: Metadata = {
  title: '바로고 | 혼밥하기 싫다면, 파티원을 구해서 바로고!',
  description: '바로고에서 혼밥하기 싫다면, 파티원을 구해서 바로고!',
};

export default function LandingPage() {
  return <LandingContainer />;
}
