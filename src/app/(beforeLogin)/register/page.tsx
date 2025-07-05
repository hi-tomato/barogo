'use client';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/app/shared/ui';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useSignUp } from '@/app/shared/hooks/queries/useAuth';
import { SignupRequest } from '@/app/shared/types/auth';
import { useState } from 'react';
import SignUpSuccessModal from '../_components/SignUpSuccessModal';

interface SignupFormData extends SignupRequest {
  confirmPassword: string;
  terms: boolean;
}

export default function RegisterForm() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: signUp, isPending: isLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    const signupData: SignupRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    signUp(signupData, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
    });
  };

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
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Input
              {...register('name', {
                required: '이름을 입력해주세요',
                minLength: {
                  value: 2,
                  message: '이름은 최소 2자 이상이어야 합니다',
                },
              })}
              label="이름"
              placeholder="홍길동"
              error={errors.name?.message}
              disabled={isLoading}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              label="이메일"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              disabled={isLoading}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다',
                },
              })}
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              disabled={isLoading}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다',
              })}
              label="비밀번호 확인"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              disabled={isLoading}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                {...register('terms', {
                  required: '이용약관에 동의해주세요',
                })}
                type="checkbox"
                disabled={isLoading}
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
            text={isLoading ? '가입 중...' : '회원가입'}
            type="submit"
            loading={isLoading}
            variant="primary"
            size="lg"
            fullWidth
            className="font-suit"
          />
        </motion.form>

        <SignUpSuccessModal
          isOpen={showSuccessModal}
          userName={watch('name')}
        />
        {/* 하단 */}
        <div className="font-suit mt-6 text-center text-sm leading-relaxed text-[#8A8A8A]">
          이미 계정이 있으신가요?
          <Button
            text="로그인"
            variant="text"
            size="sm"
            disabled={isLoading}
            className="ml-1 font-semibold"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>
    </div>
  );
}
