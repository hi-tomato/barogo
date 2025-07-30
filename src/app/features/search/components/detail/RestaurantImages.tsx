'use client';
<<<<<<< HEAD
import { useState, useRef, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
=======
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useBaropotByRestaurant } from '@/app/shared/hooks/queries/useBaropot';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
>>>>>>> 7878a14 (feat: 현재 진행중인 바로팟 툴팁 기능 추가)

const defaultImages = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
];

interface RestaurantImagesProps {
  restaurantId: number;
  images?: string[];
  restaurantName?: string;
}

<<<<<<< HEAD
export const RestaurantImage = memo(function RestaurantImage({
=======
export default function RestaurantImages({
  restaurantId,
>>>>>>> 7878a14 (feat: 현재 진행중인 바로팟 툴팁 기능 추가)
  images = [],
  restaurantName = '레스토랑',
}: RestaurantImagesProps) {
  const { data: baropots } = useBaropotByRestaurant(restaurantId);
  const filterBaropot = baropots?.filter(
    (item) => item.restaurant.id === restaurantId
  );
  const baropotId = filterBaropot?.map(({ id }) => id);
  const hasActiveBaropot = filterBaropot && filterBaropot.length > 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayImages = images.length > 0 ? images : defaultImages;

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / imageWidth);

      setCurrentImageIndex(newIndex);
    });
  }, []);

  const scrollToImage = (idx: number): void => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const imageWidth = container.offsetWidth;

    container.scrollTo({
      left: idx * imageWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Container*/}
      {hasActiveBaropot && (
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500/90 to-red-500/90 px-4 py-2 text-center font-medium text-white shadow-sm backdrop-blur-sm">
          <span className="inline-block animate-pulse text-lg">🔥</span> 현재
          진행중인 바로팟이 있습니다!
          <Link href={`/baropot/${baropotId}`}>
            <BsArrowRight />
          </Link>
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex h-64 snap-x snap-mandatory overflow-x-auto"
        onScroll={handleScroll}
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {displayImages.map((image, index) => (
          <div key={index} className="relative w-full flex-shrink-0 snap-start">
            <Image
              src={image}
              alt={`${restaurantName} 이미지 ${index + 1}`}
              fill
              className="object-cover"
<<<<<<< HEAD
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              placeholder="empty"
=======
              onError={() => {
                console.error('이미지 로드 실패:', image);
              }}
>>>>>>> 7878a14 (feat: 현재 진행중인 바로팟 툴팁 기능 추가)
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* 이미지 카운터 */}
      <motion.div
        className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {currentImageIndex + 1} / {displayImages.length}
      </motion.div>

      {displayImages.length > 1 && (
        <motion.div
          className="bg-white px-4 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="scrollbar-hide flex space-x-2 overflow-x-auto">
            {displayImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-[#1C4E80] ring-1 ring-[#1C4E80]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: index === currentImageIndex ? 1.05 : 1,
                }}
              >
                <Image
                  src={image}
                  alt={`${restaurantName} 이미지 썸네일 ${index + 1}`}
                  fill
<<<<<<< HEAD
                  priority={false}
                  loading="lazy"
                  placeholder="empty"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
=======
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultImages[0];
                  }}
>>>>>>> 7878a14 (feat: 현재 진행중인 바로팟 툴팁 기능 추가)
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

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
});
