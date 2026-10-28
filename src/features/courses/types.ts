export type CourseCategory = "IT" | "Matematika" | "Bisnis" | "Desain" | "Bahasa" | "Sains" | "Lainnya"

export type CourseStatus = "draft" | "published" | "cancelled" | "completed"

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  courseCategory: CourseCategory
  status: CourseStatus
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