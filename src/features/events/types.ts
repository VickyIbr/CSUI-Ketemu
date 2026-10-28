export type EventCategory = "Workshop" | "Seminar" | "Kompetisi" | "Bootcamp" | "Webinar"

export type EventStatus = "draft" | "published" | "cancelled" | "completed"

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  category: EventCategory
  status: EventStatus
  price: number
  isFree: boolean
  quota: number
  filled: number
  startDate: string
  endDate: string
  location: string
  isOnline: boolean
  partnerId: string
  coverUrl: string
  syllabus: string[]
  objectives: string[]
  createdAt: string
  updatedAt: string
}