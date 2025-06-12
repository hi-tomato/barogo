import { apiClient } from "@/app/shared/api/client";
import { SignInRequest, SignupRequest } from "@/app/shared/types/auth";

export const authService = {
  signUp: async (params: SignupRequest) => {
    const response = await apiClient.post("/auth/signup", params);
    const data = response.data;
    console.log(`회원가입 응답체크: ${data}`);
    return data;
  },

  signIn: async (params: SignInRequest) => {
    const response = await apiClient.post("/auth/signin", params);
    const data = response.data;

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      console.log("유저 토큰을 저장하였음");
    }

    return data;
  },
};
