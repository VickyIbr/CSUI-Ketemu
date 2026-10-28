export interface Partner {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string
  banner: string
  isVerified: boolean
  isPublished: boolean
  socialLinks: {
    website?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  stats: {
    eventsHosted: number
    totalParticipants: number
  }
  createdAt: string
  updatedAt: string
}

export interface PartnerProfile extends Partner {
  events: string[]
}