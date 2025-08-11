import { useMemo, useState } from 'react';
import { SignupRequest } from '@/app/shared/types/auth';
import { useSignUp } from '@/app/shared/hooks/queries/useAuth';
import { useFormBase } from '@/app/shared/hooks/form/useFormBase';
import { REGISTER_FORM_VALIDATE_RULES } from '@/app/shared/lib/validate';

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
    setValue,
    formState: { errors },
  } = useFormBase<RegisterFormDataProps>({
    onSubmit: ({ name, email, password }) => {
      const signupData: SignupRequest = {
        name,
        email,
        password,
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
  const validateRules = useMemo(
    () => ({
      ...REGISTER_FORM_VALIDATE_RULES,
      confirmPassword: {
        ...REGISTER_FORM_VALIDATE_RULES.confirmPassword,
        validate: (v: string) =>
          v === password || '비밀번호가 일치하지 않습니다.',
      },
    }),
    [password]
  );

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    showSuccessModal,
    isSignUpPending,
    validateRules,
  };
};
