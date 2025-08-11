import { useState, useRef, useCallback, useMemo } from 'react';
import { useRestaurantDetail } from '@/app/shared/hooks/queries/useRestaurant';
import {
  BaropotToolTip,
  ImageSlider,
  ImageCounter,
  ImageThumbnails,
} from './image';

const defaultImages = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
];

interface RestaurantImagesProps {
  restaurantId: number;
  images?: string[];
  restaurantName?: string;
}

export default function RestaurantImages({
  restaurantId,
  images = [],
  restaurantName = '레스토랑',
}: RestaurantImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data } = useRestaurantDetail(restaurantId);

  const BAROPOT_INFO = useMemo(() => {
    const baropots = data?.baropots || [];
    return {
      hasActive: baropots.length > 0,
      redirectUrl: baropots[0]?.id,
    };
  }, [data?.baropots]);

  const displayImages = useMemo(
    () => (images.length > 0 ? images : defaultImages),
    [images]
  );

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const imageWidth = sliderRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / imageWidth);

    setCurrentImageIndex((prev) => (prev !== newIndex ? newIndex : prev));
  }, []);

  const scrollToImage = useCallback((idx: number): void => {
    if (!sliderRef.current) return;

    const imageWidth = sliderRef.current.offsetWidth;

    sliderRef.current.scrollTo({
      left: idx * imageWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="relative">
      {/* 현재 진행중인 바로팟 툴팁 */}
      {BAROPOT_INFO.hasActive && (
        <BaropotToolTip redirectUrl={String(BAROPOT_INFO.redirectUrl)} />
      )}

      {/* 이미지 슬라이더 */}
      <ImageSlider
        displayImages={displayImages}
        restaurantName={restaurantName}
        onScroll={handleScroll}
      />

      {/* 이미지 카운터 */}
      <ImageCounter
        currentImageIndex={currentImageIndex}
        displayImages={displayImages}
      />

      {/* 이미지 썸네일 */}
      <ImageThumbnails
        displayImages={displayImages}
        currentImageIndex={currentImageIndex}
        restaurantName={restaurantName}
        onThumbnailClick={scrollToImage}
      />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
