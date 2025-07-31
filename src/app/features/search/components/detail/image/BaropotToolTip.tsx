'use client';
import { memo } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

interface BaropotToolTipProps {
  redirectUrl: string;
}

const BaropotToolTip = memo(function BaropotToolTip({
  redirectUrl,
}: BaropotToolTipProps) {
  return (
    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500/90 to-red-500/90 px-4 py-2 text-center font-medium text-white shadow-sm backdrop-blur-sm">
      <span className="inline-block animate-pulse text-lg">🔥</span> 현재
      진행중인 바로팟이 있습니다!
      <Link href={`/baropot/${redirectUrl}`}>
        <BsArrowRight />
      </Link>
    </div>
  );
});

BaropotToolTip.displayName = 'BaropotToolTip';
export default BaropotToolTip;
