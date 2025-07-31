import { motion } from 'framer-motion';

interface ImageCounterProps {
  currentImageIndex: number;
  displayImages: string[];
}

export default function ImageCounter({
  currentImageIndex,
  displayImages,
}: ImageCounterProps) {
  return (
    <motion.div
      className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {currentImageIndex + 1} / {displayImages.length}
    </motion.div>
  );
}
