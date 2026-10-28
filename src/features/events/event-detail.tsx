import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEventsStore } from "@/store/events-store"
import { formatCurrency, formatDateLong } from "@/lib/format"

export function EventDetailPage() {
  const { slug } = useParams()
  const events = useEventsStore((s) => s.events)
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-ink-soft">Event tidak ditemukan.</p>
        <Button asChild className="mt-4">
          <Link to="/event">Kembali ke event</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={event.image} alt={event.title} className="h-64 w-full rounded-lg object-cover" />
      <div className="mt-6 space-y-4">
        <h1 className="text-3xl font-bold text-ink">{event.title}</h1>
        <p className="text-ink-soft">{event.description}</p>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-sm text-ink-soft">Tanggal</span>
            <p className="font-medium text-ink">{formatDateLong(event.startDate)}</p>
          </div>
          <div>
            <span className="text-sm text-ink-soft">Lokasi</span>
            <p className="font-medium text-ink">{event.location}</p>
          </div>
          <div>
            <span className="text-sm text-ink-soft">Harga</span>
            <p className="font-bold text-ink-blue">{formatCurrency(event.price)}</p>
          </div>
        </div>
        <Button asChild>
          <Link to={`/checkout/${event.id}`}>Daftar Sekarang</Link>
        </Button>
      </div>
    </div>
  )
}