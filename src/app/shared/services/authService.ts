import { apiClient } from "@/app/shared/api/client";
import { SignupRequest } from "@/app/shared/types/auth";

export const authService = {
  signUp: async (params: SignupRequest) => {
    try {
      const response = await apiClient.post("/auth/signup", params);
      const data = response.data;
      console.log(`회원가입 응답체크: ${data}`);
      return data;
    } catch (error) {
      console.error("로그인 실패 :", error);
      throw error;
    }
  },
};
