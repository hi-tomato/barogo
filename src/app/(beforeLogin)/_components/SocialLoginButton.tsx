import { Button } from '@/app/shared/ui';
import { motion } from 'framer-motion';
import { RiGoogleFill, RiKakaoTalkFill } from 'react-icons/ri';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/auth/signin/google`;
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        text="구글로 시작하기"
        onClick={handleGoogleLogin}
        type="button"
        variant="google"
        size="lg"
        icon={<RiGoogleFill />}
        iconPosition="left"
        fullWidth
        className="font-suit"
      />
    </motion.div>
  );
}

export function KakaoButton() {
  const handleKakaoLogin = () => {
    window.location.href = `${baseURL}/auth/signin/kakao`;
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        text="카카오로 시작하기"
        onClick={handleKakaoLogin}
        type="button"
        variant="kakao"
        size="lg"
        icon={<RiKakaoTalkFill />}
        iconPosition="left"
        fullWidth
        className="font-suit"
      />
    </motion.div>
  );
}
