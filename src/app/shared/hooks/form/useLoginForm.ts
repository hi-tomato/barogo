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
    handleSubmit,
    formState: { errors },
  } = useFormBase<LoginFormData>({
    onSubmit: (data: LoginFormData) => {
      login(data);
    },
    mode: 'onChange',
  });

  const validateRules = {
    email: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^\S+@\S+$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
    password: {
      required: '비밀번호를 입력해주세요',
    },
  };

  return { handleSubmit, errors, validateRules, isLoginPending, loginError };
};
