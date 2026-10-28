export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number | null
}

export interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "advanced"
}

export interface Post {
  id: string
  userId: string
  title: string
  content: string
  createdAt: string
}

export interface User {
  id: string
  username: string
  email: string
  name: string
  headline: string
  bio: string
  avatarUrl: string
  education: Education[]
  skills: Skill[]
  createdAt: string
}