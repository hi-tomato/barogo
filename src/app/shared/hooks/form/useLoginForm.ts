import { LOGIN_FORM_VALIDATE_RULES } from '@/app/shared/lib/validate';
import { useSignIn } from '../queries/useAuth';
import { useFormBase } from './useFormBase';

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const {
    mutate: login,
    isPending: isLoginPending,
    error: loginError,
  } = useSignIn();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormBase<LoginFormData>({
    onSubmit: (data: LoginFormData) => {
      login(data);
    },
    mode: 'onChange',
  });

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    LOGIN_FORM_VALIDATE_RULES,
    isLoginPending,
    loginError,
  };
};
