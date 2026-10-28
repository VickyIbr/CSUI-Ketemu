import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Event, Partner } from "@/types"
import { eventsSeed } from "@/features/events/data/events.seed"
import { partnersSeed } from "@/features/partners/data/partners.seed"

interface EventsState {
  events: Event[]
  partners: Partner[]
  isLoading: boolean
  error: string | null
  loadData: () => Promise<void>
  getEventById: (id: string) => Event | undefined
  getPartnerById: (id: string) => Partner | undefined
  searchEvents: (query: string) => Event[]
  filterEvents: (filter: Record<string, unknown>) => Event[]
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: eventsSeed,
      partners: partnersSeed,
      isLoading: false,
      error: null,

      loadData: async () => {
        set({ isLoading: true, error: null })
        try {
          set({ events: eventsSeed, partners: partnersSeed, isLoading: false })
        } catch (err) {
          set({ error: "Failed to load data", isLoading: false })
        }
      },

      getEventById: (id: string) => {
        return get().events.find((e: Event) => e.id === id)
      },

      getPartnerById: (id: string) => {
        return get().partners.find((p: Partner) => p.id === id)
      },

      searchEvents: (query: string) => {
        const q = query.toLowerCase()
        return get().events.filter(
          (e: Event) =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q)
        )
      },

      filterEvents: (filter: Record<string, unknown>) => {
        let result = get().events
        if (filter.category) {
          result = result.filter((e: Event) => e.category === filter.category)
        }
        if (filter.format) {
          result = result.filter((e: Event) => e.format === filter.format)
        }
        if (filter.minPrice) {
          result = result.filter((e: Event) => e.price >= Number(filter.minPrice))
        }
        if (filter.maxPrice) {
          result = result.filter((e: Event) => e.price <= Number(filter.maxPrice))
        }
        return result
      },
    }),
    {
      name: "ketemu-events-storage",
      partialize: (state: EventsState) => ({ events: state.events, partners: state.partners }),
    }
  )
)