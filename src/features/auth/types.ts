export type AccountType = "user" | "mitra" | "admin"

export interface Session {
  userId: string
  accountType: AccountType
  token: string
  provider?: "google" | "email"
  displayName?: string
}