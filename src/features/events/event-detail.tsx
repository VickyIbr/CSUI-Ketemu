import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEventsStore } from "@/store/events-store"
import { formatCurrency, formatDateLong } from "@/lib/format"
import { EventCard } from "@/components/common/event-card"

export function EventDetailPage() {
  const { slug } = useParams()
  const events = useEventsStore((s) => s.events)
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-ink">Event tidak ditemukan</h1>
        <Button asChild className="mt-4">
          <Link to="/events">Kembali ke event</Link>
        </Button>
      </div>
    )
  }

  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-ink-soft">
        <Link to="/" className="hover:underline">Beranda</Link>
        {" / "}
        <Link to="/events" className="hover:underline">Event</Link>
        {" / "}
        <span className="text-ink">{event.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <img
            src={event.image}
            alt={event.title}
            className="aspect-[16/9] w-full rounded-lg object-cover"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{event.category}</Badge>
              <Badge variant="pending">{event.format}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-ink">{event.title}</h1>
            <p className="mt-2 text-ink-soft">{event.organizer}</p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-line bg-paper p-4">
            <div>
              <span className="text-sm text-ink-soft">Tanggal</span>
              <p className="font-medium text-ink">{formatDateLong(event.startDate)}</p>
            </div>
            <div>
              <span className="text-sm text-ink-soft">Lokasi</span>
              <p className="font-medium text-ink">{event.location}</p>
            </div>
            <div>
              <span className="text-sm text-ink-soft">Kuota</span>
              <p className="font-medium text-ink">
                {event.seatsLeft} / {event.seats}
              </p>
            </div>
            <div>
              <span className="text-sm text-ink-soft">Harga</span>
              <p className="font-bold text-ink-blue">{formatCurrency(event.price)}</p>
            </div>
          </div>

          {/* Description */}
          <section>
            <h2 className="text-xl font-bold text-ink">Deskripsi</h2>
            <p className="mt-2 text-ink-soft leading-relaxed">{event.description}</p>
          </section>

          {/* Syllabus */}
          <section>
            <h2 className="text-xl font-bold text-ink">Silabus</h2>
            <ol className="mt-2 list-decimal pl-5 space-y-1 text-ink-soft">
              {event.syllabus.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </section>

          {/* Targets */}
          <section>
            <h2 className="text-xl font-bold text-ink">Target Pencapaian</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-ink-soft">
              {event.targets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink">Event Serupa</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((e) => (
                  <EventCard key={e.id} event={e} variant="compact" />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-lg border border-line bg-paper p-4">
            <p className="text-2xl font-bold text-ink-blue">{formatCurrency(event.price)}</p>
            <p className="mt-1 text-sm text-ink-soft">
              Hold tiket 15 menit setelah checkout
            </p>
            <Button asChild className="mt-4 w-full">
              <Link to={`/checkout/${event.id}`}>Daftar Sekarang</Link>
            </Button>
            <Button variant="ghost" className="mt-2 w-full">
              Bookmark
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}