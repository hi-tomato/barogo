'use client';
import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageThumbnailsProps {
  displayImages: string[];
  currentImageIndex: number;
  restaurantName: string;
  onThumbnailClick: (index: number) => void;
}

const ImageThumbnails = memo(function ImageThumbnails({
  displayImages,
  currentImageIndex,
  restaurantName,
  onThumbnailClick,
}: ImageThumbnailsProps) {
  const handleThumbnailClick = useCallback(
    (index: number) => {
      onThumbnailClick(index);
    },
    [onThumbnailClick]
  );

  if (displayImages.length <= 1) return null;

  return (
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
            onClick={() => handleThumbnailClick(index)}
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
              priority={false}
              loading="lazy"
              placeholder="empty"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop';
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

ImageThumbnails.displayName = 'ImageThumbnails';

export default ImageThumbnails;
