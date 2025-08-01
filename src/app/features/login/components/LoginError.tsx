import { motion } from 'framer-motion';

interface LoginErrorProps {
  loginError: Error | null;
}

export default function LoginError({ loginError }: LoginErrorProps) {
  if (!loginError) return null;

  return (
    <motion.div
      className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      로그인에 실패했습니다. 다시 시도해주세요.
    </motion.div>
  );
}
