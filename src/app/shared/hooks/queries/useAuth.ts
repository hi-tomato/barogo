import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "../../types/auth";
import { authService } from "../../services/authService";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signUp(userData),
    onError: (error) => {
      console.error("회원가입 실패 :", error.message);
    },
  });
};
