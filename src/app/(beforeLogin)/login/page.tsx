'use client';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/app/shared/ui';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/app/shared/lib/animation';
import { useSignIn } from '@/app/shared/hooks/queries/useAuth';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { mutate: login, isPending, error } = useSignIn();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

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
          onSubmit={handleSubmit(onSubmit)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Input
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              label="이메일"
              placeholder="you@example.com"
              error={errors.email?.message}
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
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: '대문자 1개와 특수문자 1개를 포함해야 합니다',
                },
              })}
              label="비밀번호"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                text={isPending ? '로그인 중...' : '로그인'}
                type="submit"
                className="font-suit w-full rounded-lg bg-[#1C4E80] px-6 py-3 font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                text="카카오로 시작하기"
                type="button"
                icon={<RiKakaoTalkFill />}
                iconPosition="left"
                className="font-suit flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] px-6 py-3 font-semibold tracking-tight text-[#000000] transition-colors hover:bg-[#FFDC00]"
              />
            </motion.div>
          </motion.div>
        </motion.form>
        {/* 로그인 실패 시 (Error) */}
        {error && (
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
            className="ml-1 font-semibold text-[#1C4E80] hover:underline"
            onClick={() => router.push('/register')}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
