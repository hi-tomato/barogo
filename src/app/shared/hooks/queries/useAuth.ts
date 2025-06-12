import { useMutation } from "@tanstack/react-query";
import { SignInRequest, SignupRequest } from "../../types/auth";
import { authService } from "@/app/shared/services/authService";
import { useAuthStore } from "@/app/shared/store/useAuthStore";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signUp(userData),
    onError: (error) => {
      console.error("회원가입 실패 :", error.message);
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (userData: SignInRequest) => authService.signIn(userData),
    onSuccess: (response) => {
      setUser(response.user);
      document.cookie = `access_token=${response.access_token}; path=/`;
      router.push("/main");
    },
    onError: (error) => {
      console.error("로그인 실패 :", error.message);
    },
  });
};
