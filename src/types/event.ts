export interface Event {
  id: string
  slug: string
  title: string
  category: "course" | "workshop" | "seminar" | "kompetisi"
  format: "online" | "offline" | "hybrid"
  price: number
  originalPrice?: number
  seats: number
  seatsLeft: number
  startDate: string
  endDate: string
  location: string
  organizer: string
  partnerId: string
  image: string
  description: string
  syllabus: string[]
  targets: string[]
  isFeatured: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface EventFilter {
  category?: string
  format?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface EventSortOption {
  value: "newest" | "popular" | "price-asc" | "price-desc" | "date"
  label: string
}