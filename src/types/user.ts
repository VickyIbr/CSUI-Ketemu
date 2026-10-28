export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  bio?: string
  isPartner: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  userId: string
  email: string
  name: string
  isPartner: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
}