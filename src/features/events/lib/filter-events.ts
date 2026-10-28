import { Event } from "@/features/events/types"

export type SortOption = "termurah" | "terpopuler" | "terdekat" | "terbaru"

export interface FilterOptions {
  keyword?: string
  categories?: string[]
  priceMin?: number
  priceMax?: number
  dateFrom?: string
  dateTo?: string
  sort?: SortOption
}

export function filterEvents(events: Event[], options: FilterOptions): Event[] {
  let filtered = events.filter((event) => {
    // Only published events with available quota
    if (event.status !== "published") return false
    if (event.filled >= event.quota) return false

    // Keyword filter
    if (options.keyword) {
      const kw = options.keyword.toLowerCase()
      const matches =
        event.title.toLowerCase().includes(kw) ||
        event.location.toLowerCase().includes(kw)
      if (!matches) return false
    }

    // Category filter
    if (options.categories && options.categories.length > 0) {
      if (!options.categories.includes(event.category)) return false
    }

    // Price range filter
    if (options.priceMin !== undefined && event.price < options.priceMin) return false
    if (options.priceMax !== undefined && event.price > options.priceMax) return false

    // Date range filter
    if (options.dateFrom && new Date(event.startDate) < new Date(options.dateFrom)) return false
    if (options.dateTo && new Date(event.startDate) > new Date(options.dateTo)) return false

    return true
  })

  // Sort
  if (options.sort) {
    switch (options.sort) {
      case "termurah":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "terpopuler":
        filtered.sort((a, b) => b.filled - a.filled)
        break
      case "terdekat":
        filtered.sort(
          (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        break
      case "terbaru":
        filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
    }
  }

  return filtered
}
