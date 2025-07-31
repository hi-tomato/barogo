import { Metadata } from 'next';
import ToastContainer from '@/app/shared/ui/toast/ToastContainer';

export const metadata: Metadata = {
  title: 'Barogo',
  description: '새로운 사람들과 맛집을 함께 즐겨보세요!',
};

export default function BeforeLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
