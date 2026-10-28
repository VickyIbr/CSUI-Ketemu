export type PersonSkill = {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  verified: boolean
}

export type PersonCertificate = {
  id: string
  title: string
  issuer: string
  issuedAt: string
  courseId?: string
  eventId?: string
  verified: boolean
}

export type PersonPortfolioItem = {
  id: string
  title: string
  description: string
  url?: string
  imageUrl?: string
  type: "project" | "publication" | "award" | "experience"
  date: string
}

export type Person = {
  id: string
  username: string
  name: string
  bio: string
  avatarUrl: string
  major: string
  graduationYear: number
  university: string
  location: string
  skills: PersonSkill[]
  certificates: PersonCertificate[]
  portfolio: PersonPortfolioItem[]
  coursesAttended: string[] // course IDs
  eventsAttended: string[] // event IDs
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  isVerified: boolean
  createdAt: string
  updatedAt: string
}