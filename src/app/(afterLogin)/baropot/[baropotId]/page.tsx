import { Suspense } from 'react';
import { LoadingSpinner } from '@/app/shared/ui';
import { baropotService } from '@/app/shared/services/baropotService';
import BaropotDetailClient from '@/app/features/baropot/components/BaropotDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ baropotId: number }>;
}) {
  try {
    const { baropotId } = await params;
    const baropot = await baropotService.getDetail(baropotId);

    if (!baropot) {
      return {
        title: '해당 바로팟 상세 페이지를 찾을 수 없습니다.',
        description: '요청하신 바로팟 상세 페이지를 찾을 수 없습니다.',
      };
    }

    return {
      title: `${baropot.restaurant.name} | Barogo`,
      description: `${baropot.restaurant.name} - ${baropot.description}`,
      keywords: `${baropot.restaurant.name}, ${baropot.description}`,
      images: baropot.restaurant.photos ? [baropot.restaurant.photos[0]] : [],
    };
  } catch {
    return {
      title: '해당 바로팟 상세 페이지를 찾을 수 없습니다.',
      description: '요청하신 바로팟 상세 페이지를 찾을 수 없습니다.',
    };
  }
}

export default function BaropotDetailServer() {
  return (
    <Suspense fallback={<LoadingSpinner size="sm" />}>
      <BaropotDetailClient />
    </Suspense>
  );
}
