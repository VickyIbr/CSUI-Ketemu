import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCard } from "@/components/common/event-card"
import { useEventsStore } from "@/store/events-store"
import { filterEvents, sortEvents, type SortOption } from "@/features/events/lib/filter-events"

export function DiscoveryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const events = useEventsStore((s) => s.events)

  const q = searchParams.get("q") || ""
  const kategori = searchParams.get("kategori")?.split(",").filter(Boolean) || []
  const sort = (searchParams.get("sort") as SortOption) || "terbaru"

  const [localQ, setLocalQ] = useState(q)

  const filtered = filterEvents(events, { q, kategori })
  const sorted = sortEvents(filtered, sort)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set("q", localQ)
    setSearchParams(params)
  }

  const toggleCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams)
    const cats = kategori.includes(cat)
      ? kategori.filter((c) => c !== cat)
      : [...kategori, cat]
    if (cats.length > 0) {
      params.set("kategori", cats.join(","))
    } else {
      params.delete("kategori")
    }
    setSearchParams(params)
  }

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", value)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
    setLocalQ("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">Jelajahi Event</h1>

      {/* Search + Sort */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="Cari event..."
            className="w-64"
          />
          <Button type="submit" size="sm">
            Cari
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-soft">Urutkan:</span>
          <Select value={sort} onValueChange={handleSort}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="termurah">Termurah</SelectItem>
              <SelectItem value="terpopuler">Terpopuler</SelectItem>
              <SelectItem value="terdekat">Terdekat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {kategori.map((cat) => (
          <Badge key={cat} variant="default" className="cursor-pointer" onClick={() => toggleCategory(cat)}>
            {cat} ×
          </Badge>
        ))}
        {(q || kategori.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Reset
          </Button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["course", "workshop", "seminar", "kompetisi"].map((cat) => (
          <Badge
            key={cat}
            variant={kategori.includes(cat) ? "default" : "pending"}
            className="cursor-pointer"
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="mt-6">
        <p className="text-sm text-ink-soft">{sorted.length} hasil ditemukan</p>
        {sorted.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-ink-soft">Tidak ada event yang sesuai.</p>
            <Button variant="secondary" className="mt-4" onClick={clearFilters}>
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}