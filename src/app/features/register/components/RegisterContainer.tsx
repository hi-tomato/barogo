'use client';
import { useRegisterForm } from '@/app/shared/hooks/form/useRegisterForm';
import RegisterHeader from './RegisterHeader';
import RegisterForm from './RegisterForm';
import RegisterFooter from './RegisterFooter';
import SignUpSuccessModal from '@/app/(beforeLogin)/_components/SignUpSuccessModal';

export default function RegisterContainer() {
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
      <RegisterHeader />

      <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="font-suit mb-2 text-center text-2xl leading-relaxed font-semibold text-[#1C4E80]">
          회원가입
        </h1>
        <p className="font-suit mb-6 text-center text-sm leading-relaxed text-[#8A8A8A]">
          바로고에서 새로운 맛집 친구들을 만나보세요!
        </p>

        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSignUpPending={isSignUpPending}
          validateRules={validateRules}
        />

        <RegisterFooter />
      </div>

      <SignUpSuccessModal isOpen={showSuccessModal} />
    </div>
  );
}
