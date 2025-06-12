import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "../../types/auth";
import { authService } from "../../services/authService";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signUp(userData),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("회원가입 실패 :", error.message);
    },
  });
};
