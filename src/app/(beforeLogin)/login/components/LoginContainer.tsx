'use client';
import { motion } from 'framer-motion';
import { useLoginForm } from '@/app/shared/hooks/form/useLoginForm';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import LoginError from './LoginError';
import LoginFooter from './LoginFooter';

export default function LoginContainer() {
  const {
    register,
    handleSubmit,
    errors,
    LOGIN_FORM_VALIDATE_RULES,
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
        <LoginHeader />

        <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoginPending={isLoginPending}
          LOGIN_FORM_VALIDATE_RULES={LOGIN_FORM_VALIDATE_RULES}
        />

        <LoginError loginError={loginError} />
        <LoginFooter />
      </motion.div>
    </div>
  );
}
