import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEventsStore } from "@/store/events-store"
import { formatCurrency } from "@/lib/format"

export function LandingPage() {
  const events = useEventsStore((s) => s.events)
  const featured = events.filter((e) => e.isFeatured).slice(0, 3)

  return (
    <div>
      <section className="bg-paper px-4 py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-ink">Ketemu Platform</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Marketplace event edukasi untuk mahasiswa dan profesional.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link to="/event">Jelajahi Event</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-ink">Event Unggulan</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <div key={event.id} className="overflow-hidden rounded-lg border border-line bg-paper">
              <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-ink">{event.title}</h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2">{event.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-ink-blue">{formatCurrency(event.price)}</span>
                  <Button asChild size="sm">
                    <Link to={`/event/${event.slug}`}>Detail</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}