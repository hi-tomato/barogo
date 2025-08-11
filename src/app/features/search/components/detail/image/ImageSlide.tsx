'use client';
import { memo } from 'react';
import Image from 'next/image';

interface ImageSlideProps {
  image: string;
  index: number;
  restaurantName: string;
}

const ImageSlide = memo(function ImageSlide({
  image,
  index,
  restaurantName,
}: ImageSlideProps) {
  return (
    <div className="relative w-full flex-shrink-0 snap-start">
      <Image
        src={image}
        alt={`${restaurantName} 이미지 ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
        priority={index === 0}
        placeholder="empty"
        onError={() => {
          console.error('이미지 로드 실패:', image);
        }}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
});

ImageSlide.displayName = 'ImageSlide';
export default ImageSlide;
