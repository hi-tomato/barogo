import { Metadata } from 'next';
import RegisterContainer from '@/app/features/register/components/RegisterContainer';

export const metadata: Metadata = {
  title:
    '바로고 | 회원가입 후 맛집을 새롭게 만난 친구들과 즐거운 식사를 시작해보세요.',
  description:
    '바로고에서 회원가입 후 맛집을 새롭게 만난 친구들과 즐거운 식사를 시작해보세요.',
};

export default function RegisterPage() {
  return <RegisterContainer />;
}
