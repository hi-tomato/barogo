import { useMutation } from "@tanstack/react-query";
import { SignInRequest, SignupRequest } from "../../types/auth";
import { authService } from "@/app/shared/services/authService";
import { useAuthStore } from "@/app/shared/store/useAuthStore";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../../lib/authToken";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signUp(userData),
    onError: (error) => {
      console.error("회원가입 실패 :", error.message);
    },
  });
};

export const useSignIn = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (userData: SignInRequest) => authService.signIn(userData),
    onSuccess: async (response) => {
      setAccessToken(response.accessToken);
      const userData = await authService.getUser();
      setUser(userData);
      router.push("/main");
    },
    onError: (error) => {
      console.error("로그인 실패 :", error.message);
    },
  });
};

export const useGetUser = () => {
  return useMutation({
    mutationFn: () => authService.getUser(),
    onError: (error) => {
      console.error("사용자 정보 조회 실패:", error.message);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      router.push("/");
    },
    onError: () => {
      logout();
      router.push("/");
    },
  });
};
