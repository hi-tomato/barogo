'use client';
import { Button, Input } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useRegisterForm } from '@/app/shared/hooks/form/useRegisterForm';
import SignUpSuccessModal from '../_components/SignUpSuccessModal';
import { useToast } from '@/app/shared/hooks/useToast';

export default function RegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    errors,
    showSuccessModal,
    isSignUpPending,
    validateRules,
  } = useRegisterForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="font-suit mb-2 text-center text-2xl leading-relaxed font-semibold text-[#1C4E80]">
          회원가입
        </h1>
        <p className="font-suit mb-6 text-center text-sm leading-relaxed text-[#8A8A8A]">
          바로고에서 새로운 맛집 친구들을 만나보세요!
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Input
              {...register('name', validateRules.name)}
              label="이름"
              placeholder="홍길동"
              error={errors.name?.message}
              disabled={isSignUpPending}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('email', validateRules.email)}
              label="이메일"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              disabled={isSignUpPending}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('password', validateRules.password)}
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              disabled={isSignUpPending}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('confirmPassword', validateRules.confirmPassword)}
              label="비밀번호 확인"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              disabled={isSignUpPending}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                {...register('terms', validateRules.terms)}
                type="checkbox"
                disabled={isSignUpPending}
                className="h-4 w-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] disabled:opacity-50"
              />
              <span className="font-suit text-sm text-[#2B2B2B]">
                이용약관 및 개인정보처리방침에 동의합니다
              </span>
            </label>
            {errors.terms && (
              <p className="font-suit mt-1 text-xs text-red-500">
                {errors.terms.message}
              </p>
            )}
          </motion.div>

          <Button
            text={isSignUpPending ? '가입 중...' : '회원가입'}
            type="submit"
            loading={isSignUpPending}
            variant="primary"
            size="lg"
            fullWidth
            className="font-suit"
          />
        </motion.form>

        <SignUpSuccessModal isOpen={showSuccessModal} userName="" />

        {/* 하단 */}
        <div className="mt-6 text-center">
          <p className="font-suit text-sm text-[#8A8A8A]">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-suit text-[#1C4E80] hover:underline"
            >
              로그인하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
