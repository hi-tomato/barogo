import { post } from "@/app/shared/api/client";
import {
  SignInRequest,
  SignupRequest,
  SignupResponse,
} from "@/app/shared/types/auth";

export const authService = {
  signUp: async (params: SignupRequest) => {
    const { data } = await post<SignupResponse>("/auth/signup", params);
    console.log(`회원가입 응답체크: ${data}`);
    return data;
  },

  signIn: async (params: SignInRequest) => {
    const response = await post("/auth/signin", params);
    const data = response.data;

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      console.log("유저 토큰을 저장하였음");
    }

    return data;
  },
};
