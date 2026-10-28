import { create } from "zustand"
import { Session } from "@/features/auth/types"

interface AuthState {
  session: Session | null
  login: (session: Session) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  login: (session) => set({ session }),
  logout: () => set({ session: null }),
  isAuthenticated: () => get().session !== null,
}))