import { useState, useMemo } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SEO } from "@/components/seo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"
import { formatIDR } from "@/lib/format"
import { Link } from "react-router-dom"

const categories = ["Semua", "Course", "Workshop", "Seminar", "Kompetisi", "Bootcamp", "Webinar"]

export function DiscoveryPage() {
  const events = useEventsStore((s) => s.events)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [filterFree, setFilterFree] = useState<boolean | null>(null)
  const [filterOnline, setFilterOnline] = useState<boolean | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = useMemo(() => {
    let result = events
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    }
    if (selectedCategory !== "Semua") {
      result = result.filter((e) => e.category === selectedCategory)
    }
    if (filterFree !== null) {
      result = result.filter((e) => e.isFree === filterFree)
    }
    if (filterOnline !== null) {
      result = result.filter((e) => e.isOnline === filterOnline)
    }
    return result
  }, [events, query, selectedCategory, filterFree, filterOnline])

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <SEO title="Event" description="Temukan event edukasi, seminar, workshop, dan kompetisi dari mitra terpercaya." />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink">Temukan Event</h1>
        <p className="mt-1 text-ink-soft">
          {filteredEvents.length} event tersedia
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <Input
            placeholder="Cari event, workshop, seminar apa aja..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="mt-4 flex flex-wrap gap-3 rounded-lg border bg-card p-4">
          <Button
            variant={filterFree === true ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilterFree(filterFree === true ? null : true)}
          >
            Gratis
          </Button>
          <Button
            variant={filterFree === false ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilterFree(filterFree === false ? null : false)}
          >
            Berbayar
          </Button>
          <Button
            variant={filterOnline === true ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilterOnline(filterOnline === true ? null : true)}
          >
            Online
          </Button>
          <Button
            variant={filterOnline === false ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilterOnline(filterOnline === false ? null : false)}
          >
            Offline
          </Button>
        </div>
      )}

      {/* Event grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => {
          const partner = getPartnerById(event.partnerId)
          return (
            <Card key={event.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <div className="aspect-video bg-muted">
                <img
                  src={event.coverUrl}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">
                  {event.category}
                </Badge>
                <h3 className="font-semibold text-ink line-clamp-2">{event.title}</h3>
                <p className="mt-1 text-sm text-ink-soft line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">
                    {event.isFree ? "Gratis" : formatIDR(event.price)}
                  </span>
                  <span className="text-xs text-ink-soft">
                    {event.filled}/{event.quota} peserta
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <span>{partner?.name}</span>
                    <span>•</span>
                    <span>{event.isOnline ? "Online" : event.location}</span>
                  </div>
                  <Button size="sm" variant="secondary" asChild>
                    <Link to={`/events/${event.slug}`}>Detail</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-ink-soft">Gak ada event yang ditemukan nih</p>
          <p className="mt-1 text-sm text-ink-soft">
            Coba ubah filter atau kata kunci pencarian kamu
          </p>
        </div>
      )}
    </div>
  )
}