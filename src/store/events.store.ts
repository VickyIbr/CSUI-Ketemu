import { create } from "zustand"
import { Event } from "@/features/events/types"
import { eventsSeed } from "@/features/events/data/events.seed"

interface EventsState {
  events: Event[]
  setEvents: (events: Event[]) => void
  getEventBySlug: (slug: string) => Event | undefined
  getEventById: (id: string) => Event | undefined
  getEventsByPartner: (partnerId: string) => Event[]
  getEventsByCategory: (category: string) => Event[]
  searchEvents: (query: string, category?: string, isFree?: boolean, isOnline?: boolean) => Event[]
  addEvent: (event: Event) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: eventsSeed,
  setEvents: (events) => set({ events }),
  getEventBySlug: (slug) => get().events.find((e) => e.slug === slug),
  getEventById: (id) => get().events.find((e) => e.id === id),
  getEventsByPartner: (partnerId) => get().events.filter((e) => e.partnerId === partnerId),
  getEventsByCategory: (category) => get().events.filter((e) => e.category === category),
  searchEvents: (query, category, isFree, isOnline) => {
    let result = get().events
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    }
    if (category) {
      result = result.filter((e) => e.category === category)
    }
    if (isFree !== undefined) {
      result = result.filter((e) => e.isFree === isFree)
    }
    if (isOnline !== undefined) {
      result = result.filter((e) => e.isOnline === isOnline)
    }
    return result
  },
  addEvent: (event) => set({ events: [...get().events, event] }),
  updateEvent: (id, updates) =>
    set({
      events: get().events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }),
}))