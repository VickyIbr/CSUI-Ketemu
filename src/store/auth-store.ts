import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Session } from "@/types"
import { usersSeed, demoCredentials } from "@/features/profile/data/users.seed"

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { name: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 400))
        const cred = demoCredentials.find((c) => c.email === email && c.password === password)
        if (!cred) {
          set({ isLoading: false })
          return false
        }
        const user = usersSeed.find((u) => u.email === email)
        if (!user) {
          set({ isLoading: false })
          return false
        }
        const session: Session = {
          userId: user.id,
          email: user.email,
          name: user.name,
          isPartner: user.isPartner,
          createdAt: new Date().toISOString(),
        }
        set({ user, session, isLoading: false })
        return true
      },

      register: async (data: { name: string; email: string; password: string }) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 400))
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          name: data.name,
          username: `user_${Date.now()}`,
          isPartner: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const session: Session = {
          userId: newUser.id,
          email: newUser.email,
          name: newUser.name,
          isPartner: false,
          createdAt: new Date().toISOString(),
        }
        set({ user: newUser, session, isLoading: false })
        return true
      },

      logout: () => {
        set({ user: null, session: null })
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get()
        if (!user) return
        const updated = { ...user, ...data, updatedAt: new Date().toISOString() }
        set({ user: updated })
      },
    }),
    {
      name: "ketemu-auth-storage",
      partialize: (state: AuthState) => ({ user: state.user, session: state.session }),
    }
  )
)