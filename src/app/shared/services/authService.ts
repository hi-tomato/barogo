import { get, post } from "@/app/shared/api/client";
import {
  SignInRequest,
  SignInResponse,
  SignupRequest,
  SignupResponse,
  User,
} from "@/app/shared/types/auth";

export const authService = {
  signUp: async (params: SignupRequest) => {
    const { data } = await post<SignupResponse>("/auth/signup", params);
    return data;
  },

  signIn: async (params: SignInRequest) => {
    const { data } = await post<SignInResponse>("/auth/signin", params);
    return data;
  },

  getUser: async (): Promise<User> => {
    const { data } = await get<User>("/user/me");
    return data;
  },
};
