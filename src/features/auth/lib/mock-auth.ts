import { usersSeed } from "@/features/profile/data/users.seed"
import type { AccountType, Session } from "@/features/auth/types"

const DEMO_CREDENTIALS: Record<string, { password: string; userId: string; accountType: AccountType }> = {
  "user@ketemu.id": { password: "ketemu123", userId: "user-1", accountType: "user" },
  "partner@ketemu.id": { password: "ketemu123", userId: "partner-1", accountType: "mitra" },
  "admin@ketemu.id": { password: "ketemu123", userId: "admin-1", accountType: "admin" },
}

export function loginMock(email: string, password: string): Session | null {
  const cred = DEMO_CREDENTIALS[email.toLowerCase()]
  if (!cred || cred.password !== password) return null
  return {
    userId: cred.userId,
    accountType: cred.accountType,
    token: `mock-token-${cred.userId}-${Date.now()}`,
  }
}

export function registerMock(
  name: string,
  email: string,
  _password: string,
  accountType: AccountType
): Session | null {
  const existing = usersSeed.find((u) => u.email === email)
  if (existing) return null
  const newUser = {
    id: `user-${Date.now()}`,
    username: email.split("@")[0],
    email,
    name,
    headline: "",
    bio: "",
    avatarUrl: "",
    education: [],
    skills: [],
    createdAt: new Date().toISOString(),
  }
  usersSeed.push(newUser)
  return {
    userId: newUser.id,
    accountType,
    token: `mock-token-${newUser.id}-${Date.now()}`,
  }
}

export function logoutMock(): void {
  // No-op for mock
}

export function switchAccountMock(userId: string): Session | null {
  const user = usersSeed.find((u) => u.id === userId)
  if (!user) return null
  return {
    userId: user.id,
    accountType: "user",
    token: `mock-token-${user.id}-${Date.now()}`,
  }
}

export const DEMO_ACCOUNTS = Object.entries(DEMO_CREDENTIALS).map(([email, cred]) => ({
  email,
  password: cred.password,
  accountType: cred.accountType,
}))