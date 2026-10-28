import { useCallback } from "react"
import { useAuthStore } from "@/store/auth.store"
import { loginMock, registerMock, logoutMock } from "@/features/auth/lib/mock-auth"

export function useAuth() {
  const session = useAuthStore((s) => s.session)
  const setSession = useAuthStore((s) => s.login)
  const clearSession = useAuthStore((s) => s.logout)

  const login = useCallback(
    (email: string, password: string) => {
      const session = loginMock(email, password)
      if (session) setSession(session)
      return session
    },
    [setSession]
  )

  const register = useCallback(
    (name: string, email: string, password: string, accountType: "user" | "mitra") => {
      const session = registerMock(name, email, password, accountType)
      if (session) setSession(session)
      return session
    },
    [setSession]
  )

  const logout = useCallback(() => {
    logoutMock()
    clearSession()
  }, [clearSession])

  return {
    session,
    isAuthenticated: session !== null,
    login,
    register,
    logout,
  }
}