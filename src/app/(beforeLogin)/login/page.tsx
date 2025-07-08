'use client';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/app/shared/ui';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useLoginForm } from '@/app/shared/hooks/form/useLoginForm';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    validateRules,
    isLoginPending,
    loginError,
  } = useLoginForm();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm"
        initial="hidden"
        animate="visible"
      >
        {/* 타이틀 */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-suit mb-2 text-center text-2xl leading-relaxed font-semibold text-[#1C4E80]">
            Barogo
          </h1>
          <p className="font-suit mb-6 text-center text-sm leading-relaxed text-[#8A8A8A]">
            혼밥하기 싫다면, 파티원을 구해서 바로고!
          </p>
        </motion.div>

        {/* 로그인 폼 */}
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Input
              {...register('email', validateRules.email)}
              label="이메일"
              placeholder="you@example.com"
              error={errors.email?.message}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('password', validateRules.password)}
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                text="카카오로 시작하기"
                type="button"
                variant="kakao"
                size="lg"
                icon={<RiKakaoTalkFill />}
                iconPosition="left"
                fullWidth
                className="font-suit"
              />
            </motion.div>
          </motion.div>
        </motion.form>

        {/* 로그인 실패 시 (Error) */}
        {loginError && (
          <motion.div
            className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            로그인에 실패했습니다. 다시 시도해주세요.
          </motion.div>
        )}

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
      </motion.div>
    </div>
  );
}
