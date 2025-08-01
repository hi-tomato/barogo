import { Metadata } from 'next';
import LoginContainer from './components/LoginContainer';

export const metadata: Metadata = {
  title: '바로고 | 혼밥하기 싫다면, 파티원을 구해서 바로고!',
  description: '바로고에서 혼밥하기 싫다면, 파티원을 구해서 바로고!',
};

export default function LoginPage() {
  return <LoginContainer />;
}
