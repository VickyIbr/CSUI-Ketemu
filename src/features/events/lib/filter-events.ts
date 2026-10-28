import type { Event } from "@/types"

export type SortOption = "termurah" | "terpopuler" | "terdekat" | "terbaru"

export interface FilterParams {
  q?: string
  kategori?: string[]
  hargaMin?: number
  hargaMax?: number
  tanggalMin?: string
  tanggalMax?: string
  mode?: "online" | "offline" | "all"
}

export function filterEvents(events: Event[], filters: FilterParams): Event[] {
  let result = events.filter((e) => e.isPublished && e.seatsLeft > 0)

  if (filters.q) {
    const q = filters.q.toLowerCase()
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    )
  }

  if (filters.kategori && filters.kategori.length > 0) {
    result = result.filter((e) => filters.kategori!.includes(e.category))
  }

  if (filters.hargaMin !== undefined) {
    result = result.filter((e) => e.price >= filters.hargaMin!)
  }

  if (filters.hargaMax !== undefined) {
    result = result.filter((e) => e.price <= filters.hargaMax!)
  }

  if (filters.tanggalMin) {
    result = result.filter((e) => e.startDate >= filters.tanggalMin!)
  }

  if (filters.tanggalMax) {
    result = result.filter((e) => e.startDate <= filters.tanggalMax!)
  }

  if (filters.mode && filters.mode !== "all") {
    result = result.filter((e) => e.format.toLowerCase() === filters.mode)
  }

  return result
}

export function sortEvents(events: Event[], sort: SortOption): Event[] {
  const sorted = [...events]
  switch (sort) {
    case "termurah":
      return sorted.sort((a, b) => a.price - b.price)
    case "terpopuler":
      return sorted.sort((a, b) => b.seatsLeft - a.seatsLeft)
    case "terdekat":
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    case "terbaru":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    default:
      return sorted
  }
}