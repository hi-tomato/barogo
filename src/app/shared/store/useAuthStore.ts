import { create } from "zustand";
import { User } from "../types/auth";
import { getAccessToken, removeAccessToken } from "../lib/authToken";
import { authService } from "../services/authService";

interface AuthState {
  user: User | null | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,

  get isLoggedIn() {
    const { user } = get();
    return user !== null && user !== undefined;
  },

  get isLoading() {
    const { user } = get();
    return user === undefined;
  },

  setUser: (user: User) => {
    set({ user });
  },

  setLoading: (loading: boolean) => {
    set({ user: loading ? undefined : null });
  },

  logout: () => {
    removeAccessToken();
    set({ user: null });
  },

  initialize: async () => {
    const token = getAccessToken();

    if (!token) {
      set({ user: null });
      return;
    }

    try {
      set({ user: undefined });
      const userInfo = await authService.getUser();
      set({ user: userInfo });
    } catch (error) {
      removeAccessToken();
      set({ user: null });
      console.error("사용자 정보 조회 실패:", error);
    }
  },
}));
