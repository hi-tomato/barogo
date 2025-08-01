import { motion } from 'framer-motion';
import { containerVariants } from '@/app/shared/lib/animation';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: '🍽️',
    title: '맛집 발견',
    description: '주변 숨겨진 맛집을 발견하고 새로운 경험을 해보세요',
  },
  {
    icon: '⚡',
    title: '바로팟',
    description: '실시간으로 함께할 사람을 찾아 즉석 모임을 만들어요',
  },
  {
    icon: '👥',
    title: '새로운 인연',
    description: '비슷한 취향의 사람들과 만나 의미있는 관계를 만들어요',
  },
];

export default function FeatureSection() {
  return (
    <motion.div
      className="mb-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </motion.div>
  );
}
