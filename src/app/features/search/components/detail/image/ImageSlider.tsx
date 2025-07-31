'use client';
import { useCallback, useEffect, useRef } from 'react';
import ImageSlide from './ImageSlide';

interface ImageSliderProps {
  displayImages: string[];
  restaurantName: string;
  onScroll: () => void;
}

export default function ImageSlider({
  displayImages,
  restaurantName,
  onScroll,
}: ImageSliderProps) {
  const animationFrameRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      onScroll();
    });
  }, [onScroll]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="scrollbar-hide flex h-64 snap-x snap-mandatory overflow-x-auto"
      onScroll={handleScroll}
      style={{
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {displayImages.map((image, index) => (
        <ImageSlide
          key={index}
          image={image}
          index={index}
          restaurantName={restaurantName}
        />
      ))}
    </div>
  );
}
