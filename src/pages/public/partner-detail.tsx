import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEventsStore } from "@/store/events-store"
import { EventCard } from "@/components/common/event-card"

export function PartnerDetailPage() {
  const { slug } = useParams()
  const partners = useEventsStore((s) => s.partners)
  const events = useEventsStore((s) => s.events)
  const partner = partners.find((p) => p.slug === slug)

  if (!partner) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-ink">Mitra tidak ditemukan</h1>
        <Button asChild className="mt-4">
          <Link to="/events">Kembali ke event</Link>
        </Button>
      </div>
    )
  }

  const partnerEvents = events.filter((e) => e.partnerId === partner.id && e.isPublished)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-paper-2 text-2xl font-bold text-ink">
          {partner.name[0]}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">{partner.name}</h1>
            {partner.isVerified && <Badge variant="success">Verified</Badge>}
          </div>
          <p className="mt-1 text-ink-soft">{partner.tagline}</p>
          <p className="text-sm text-ink-soft">
            {partner.stats.eventsHosted} event · {partner.stats.totalParticipants} peserta
          </p>
        </div>
      </div>

      {/* Description */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-ink">Tentang</h2>
        <p className="mt-2 text-ink-soft leading-relaxed">{partner.description}</p>
      </section>

      {/* Events */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-ink">Event Aktif</h2>
        {partnerEvents.length === 0 ? (
          <p className="mt-4 text-ink-soft">Belum ada event aktif.</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}