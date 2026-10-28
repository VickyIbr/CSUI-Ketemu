import { Navigate } from "react-router-dom"

interface RequireAuthProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  // Mock: always allow for now
  const isAuthenticated = true
  if (!isAuthenticated) {
    return <Navigate to="/login?next=" replace />
  }
  return <>{children}</>
}

interface RequireRoleProps {
  children: React.ReactNode
  role: "user" | "mitra" | "admin"
}

export function RequireRole({ children, role }: RequireRoleProps) {
  // Mock: always allow for now
  const userRole = "user"
  if (userRole !== role) {
    return <Navigate to="/403" replace />
  }
  return <>{children}</>
}