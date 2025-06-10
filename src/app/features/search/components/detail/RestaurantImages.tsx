"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const mockImages = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=300&fit=crop",
];

export default function RestaurantImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const imageWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / imageWidth);

    setCurrentImageIndex(newIndex);
  };

  const scrollToImage = (idx: number): void => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const imageWidth = container.offsetWidth;

    container.scrollTo({
      left: idx * imageWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Container*/}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto h-64 snap-x snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {mockImages.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative snap-start">
            <img
              src={image}
              alt={`레스토랑 이미지 ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* 이미지 카운터 */}
      <motion.div
        className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {currentImageIndex + 1} / {mockImages.length}
      </motion.div>

      {/* 썸네일 이미지 리스트 */}
      <motion.div
        className="px-4 py-3 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {mockImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-[#1C4E80] ring-1 ring-[#1C4E80]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: index === currentImageIndex ? 1.05 : 1,
              }}
            >
              <img
                src={image}
                alt={`썸네일 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

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
