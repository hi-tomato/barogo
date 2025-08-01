'use client';
import { Button, Input } from '@/app/shared/ui';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { GoogleButton, KakaoButton } from '../../_components/SocialLoginButton';
import { LoginFormProps } from '../types';

export default function LoginForm({
  register,
  handleSubmit,
  errors,
  isLoginPending,
  LOGIN_FORM_VALIDATE_RULES,
}: LoginFormProps) {
  return (
    <motion.form
      className="space-y-4"
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Input
          {...register('email', LOGIN_FORM_VALIDATE_RULES.email)}
          label="이메일"
          placeholder="you@example.com"
          error={errors.email?.message}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input
          {...register('password', LOGIN_FORM_VALIDATE_RULES.password)}
          label="비밀번호"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            text={isLoginPending ? '로그인 중...' : '로그인'}
            type="submit"
            loading={isLoginPending}
            variant="primary"
            size="lg"
            fullWidth
            className="font-suit"
          />
        </motion.div>
        <GoogleButton />
        <KakaoButton />
      </motion.div>
    </motion.form>
  );
}
