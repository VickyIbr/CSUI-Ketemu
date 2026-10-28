import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"
import { formatIDR } from "@/lib/format"

export function LandingPage() {
  const events = useEventsStore((s) => s.events)
  const partners = usePartnersStore((s) => s.partners)
  const featuredEvents = [
    events.find((e) => e.id === "event-10"), // Webinar
    events.find((e) => e.id === "event-8"),  // Course
    events.find((e) => e.id === "event-3"),  // Seminar
    events.find((e) => e.id === "event-5"),  // Seminar
    events.find((e) => e.id === "event-7"),  // Kompetisi
  ].filter(Boolean) as typeof events

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ink-blue to-ink-blue-soft py-20">
        <div className="container mx-auto max-w-[1160px] px-5 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Temukan Event & Kursus Terbaik
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Platform event dan kursus dari mitra terpercaya. Belajar, berkembang, dan raih kesempatan baru.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/discover">Jelajahi Event</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section className="py-16">
        <div className="container mx-auto max-w-[1160px] px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Event Terpopuler di Sekitar Anda</h2>
            <Link to="/events" className="text-sm text-ink-blue underline">
              Lihat semua
            </Link>
          </div>
          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {featuredEvents.map((event) => {
              const isCourse = event.category === "Course"
              const isWebinar = event.category === "Webinar"
              return (
                <Card
                  key={event.id}
                  className={`overflow-hidden ${isCourse ? "border-2 border-ink-blue" : isWebinar ? "border-dashed border-ink-soft" : ""}`}
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={event.coverUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="mb-2 flex items-center gap-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      {isWebinar && (
                        <Badge variant="outline" className="text-xs">
                          🌐 Online
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-ink line-clamp-2">{event.title}</h3>
                    <p className="mt-1 text-xs text-ink-soft line-clamp-1">{event.location}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-ink">
                        {event.isFree || event.price === 0 ? "Gratis" : formatIDR(event.price)}
                      </p>
                      <Button size="sm" variant="secondary" asChild className="text-xs px-2 py-1 h-7">
                        <Link to={`/events/${event.slug}`}>Detail</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted py-16">
        <div className="container mx-auto max-w-[1160px] px-5">
          <h2 className="text-2xl font-bold text-ink">Mitra Terpercaya</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-ink">{partner.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{partner.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">
                      ★ {partner.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-ink-soft">
                      ({partner.reviewCount} ulasan)
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto max-w-[1160px] px-5 text-center">
          <h2 className="text-2xl font-bold text-ink">Siap Mulai Belajar?</h2>
          <p className="mt-2 text-ink-soft">
            Daftar sekarang dan temukan event yang sesuai dengan minat Anda.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/register">Daftar Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}