export interface Rekening {
  bankName: string
  accountNumber: string
  accountHolder: string
}

export interface Partner {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logoUrl: string
  websiteUrl: string
  location: string
  rating: number
  reviewCount: number
  isVerified: boolean
  rekening: Rekening
  createdAt: string
}