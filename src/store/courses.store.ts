import { create } from "zustand"
import { Course } from "@/features/courses/types"
import { coursesSeed } from "@/features/courses/data/courses.seed"

interface CoursesState {
  courses: Course[]
  setCourses: (courses: Course[]) => void
  getCourseBySlug: (slug: string) => Course | undefined
  getCourseById: (id: string) => Course | undefined
  getCoursesByPartner: (partnerId: string) => Course[]
  getCoursesByCategory: (category: string) => Course[]
  searchCourses: (query: string, category?: string, isFree?: boolean, isOnline?: boolean) => Course[]
  addCourse: (course: Course) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
}

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: coursesSeed,
  setCourses: (courses) => set({ courses }),
  getCourseBySlug: (slug) => get().courses.find((c) => c.slug === slug),
  getCourseById: (id) => get().courses.find((c) => c.id === id),
  getCoursesByPartner: (partnerId) => get().courses.filter((c) => c.partnerId === partnerId),
  getCoursesByCategory: (category) => get().courses.filter((c) => c.courseCategory === category),
  searchCourses: (query, category, isFree, isOnline) => {
    let result = get().courses
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.courseCategory.toLowerCase().includes(q)
      )
    }
    if (category) {
      result = result.filter((c) => c.courseCategory === category)
    }
    if (isFree !== undefined) {
      result = result.filter((c) => c.isFree === isFree)
    }
    if (isOnline !== undefined) {
      result = result.filter((c) => c.isOnline === isOnline)
    }
    return result
  },
  addCourse: (course) => set({ courses: [...get().courses, course] }),
  updateCourse: (id, updates) =>
    set({
      courses: get().courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }),
}))