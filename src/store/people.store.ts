import { create } from "zustand"
import { Person } from "@/features/people/types"
import { peopleSeed } from "@/features/people/data/people.seed"

interface PeopleState {
  people: Person[]
  setPeople: (people: Person[]) => void
  getPersonByUsername: (username: string) => Person | undefined
  getPersonById: (id: string) => Person | undefined
  searchPeople: (query: string, skill?: string, major?: string) => Person[]
  getPeopleByCourse: (courseId: string) => Person[]
  getPeopleByEvent: (eventId: string) => Person[]
}

export const usePeopleStore = create<PeopleState>((set, get) => ({
  people: peopleSeed,
  setPeople: (people) => set({ people }),
  getPersonByUsername: (username) => get().people.find((p) => p.username === username),
  getPersonById: (id) => get().people.find((p) => p.id === id),
  searchPeople: (query, skill, major) => {
    let result = get().people
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q) ||
          p.major.toLowerCase().includes(q) ||
          p.skills.some((s) => s.name.toLowerCase().includes(q))
      )
    }
    if (skill) {
      result = result.filter((p) => p.skills.some((s) => s.name === skill))
    }
    if (major) {
      result = result.filter((p) => p.major === major)
    }
    return result
  },
  getPeopleByCourse: (courseId) => get().people.filter((p) => p.coursesAttended.includes(courseId)),
  getPeopleByEvent: (eventId) => get().people.filter((p) => p.eventsAttended.includes(eventId)),
}))