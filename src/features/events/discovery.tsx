import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEventsStore } from "@/store/events-store"
import { formatCurrency, formatDateLong } from "@/lib/format"

export function DiscoveryPage() {
  const events = useEventsStore((s) => s.events)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">Jelajahi Event</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="overflow-hidden rounded-lg border border-line bg-paper">
            <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">{event.category}</Badge>
                <Badge variant="pending">{event.format}</Badge>
              </div>
              <h3 className="mt-2 text-lg font-bold text-ink line-clamp-2">{event.title}</h3>
              <p className="text-sm text-ink-soft">{formatDateLong(event.startDate)}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-ink-blue">{formatCurrency(event.price)}</span>
                <Button asChild>
                  <Link to={`/event/${event.slug}`}>Detail</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}