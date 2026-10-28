import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/format"
import type { Event } from "@/types"

interface EventCardProps {
  event: Event
  variant?: "default" | "compact"
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isSoldOut = event.seatsLeft <= 0

  if (variant === "compact") {
    return (
      <Link
        to={`/event/${event.slug}`}
        className="flex gap-3 rounded-md border border-line bg-paper p-3 transition-colors hover:bg-paper-2"
      >
        <img
          src={event.image}
          alt={event.title}
          className="h-16 w-24 shrink-0 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-ink line-clamp-1">{event.title}</h3>
          <p className="text-xs text-ink-soft">{formatCurrency(event.price)}</p>
        </div>
      </Link>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <Link to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt={event.title}
          className="aspect-[16/9] w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Badge variant="default">{event.category}</Badge>
          {isSoldOut && <Badge variant="danger">Sold Out</Badge>}
        </div>
        <h3 className="mt-2 text-body-sm font-semibold text-ink line-clamp-2">
          {event.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-caption text-ink-soft">
          <span>{event.organizer}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-body-sm font-semibold text-ink-blue">
            {formatCurrency(event.price)}
          </span>
          <span className="text-caption text-ink-soft">
            {event.seatsLeft} / {event.seats} kuota
          </span>
        </div>
      </div>
    </div>
  )
}