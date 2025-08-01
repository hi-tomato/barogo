'use client';
import BaropotHeader from './BaropotHeader';
import BaropotBanner from './BaropotBanner';
import BaropotContent from './BaropotContent';
import FloatingActionButton from './FloatingActionButton';

export default function BaropotContainer() {
  return (
    <div className="min-h-screen bg-[#E6EEF5]">
      <BaropotHeader />
      <BaropotBanner />
      <BaropotContent />
      <FloatingActionButton />
    </div>
  );
}
