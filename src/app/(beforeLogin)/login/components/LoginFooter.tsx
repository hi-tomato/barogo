import { useRouter } from 'next/navigation';
import { Button } from '@/app/shared/ui';
import { motion } from 'framer-motion';
import { itemVariants } from '@/app/shared/lib/animation';

export default function LoginFooter() {
  const router = useRouter();

  return (
    <motion.div
      className="font-suit mt-6 text-center text-sm leading-relaxed text-[#8A8A8A]"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.8 }}
    >
      아직 계정이 없으신가요?
      <Button
        text="회원가입"
        variant="text"
        size="sm"
        className="text-center"
        onClick={() => router.push('/register')}
      />
    </motion.div>
  );
}
