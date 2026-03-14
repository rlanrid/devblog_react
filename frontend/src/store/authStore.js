import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // state
      user: null,
      token: null,

      // actions
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      // 로그인 여부 확인
      isLoggedIn: () => !!get().token,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);