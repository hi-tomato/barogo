import { useState } from 'react';
import { SignupRequest } from '@/app/shared/types/auth';
import { useSignUp } from '@/app/shared/hooks/queries/useAuth';
import { useFormBase } from '@/app/shared/hooks/form/useFormBase';

interface RegisterFormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const useRegisterForm = () => {
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormBase<RegisterFormDataProps>({
    onSubmit: (data) => {
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
    },

    mode: 'onChange',
  });

  const password = watch('password');

  const validateRules = {
    name: {
      required: '이름을 입력해주세요',
      minLength: { value: 2, message: '이름은 2자 이상이어야 합니다.' },
    },
    email: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^\S+@\S+$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
    password: {
      required: '비밀번호를 입력해주세요',
      minLength: {
        value: 8,
        message: '비밀번호는 최소 8자 이상이어야 합니다.',
      },
    },
    confirmPassword: {
      required: '비밀번호를 입력해주세요',
      validate: (value: string) => {
        return value === password || '비밀번호가 일치하지 않습니다.';
      },
    },
    terms: {
      required: '약관에 동의해주세요',
    },
  };

  return {
    register,
    handleSubmit,
    errors,
    showSuccessModal,
    isSignUpPending,
    validateRules,
  };
};
