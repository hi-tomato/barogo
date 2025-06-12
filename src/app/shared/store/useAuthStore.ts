import { create } from "zustand";
import { User } from "../types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
