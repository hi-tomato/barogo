import MainHeader from '@/app/features/main/components/MainHeader';
import MainContentsPage from '@/app/features/main/page/MainContentsPage';

export default function MainPages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <MainHeader />

      <div className="px-4 py-6">
        <MainContentsPage />
      </div>
    </div>
  );
}
