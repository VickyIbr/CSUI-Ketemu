import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usePartnersStore } from "@/store/partners.store"
import { useEventsStore } from "@/store/events.store"
import { formatIDR } from "@/lib/format"

export function PartnerDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const partner = usePartnersStore((s) => s.partners.find((p) => p.slug === slug))
  const events = useEventsStore((s) => s.events.filter((e) => e.partnerId === partner?.id))

  if (!partner) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Mitra tidak ditemukan</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Partner info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-ink">{partner.name}</h1>
            <p className="mt-1 text-ink-soft">{partner.tagline}</p>
            <p className="mt-2 text-sm text-ink-soft">{partner.description}</p>
          </div>

          {partner.isVerified && (
            <Badge variant="default" className="bg-success text-white">
              Terverifikasi
            </Badge>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-ink-soft">Rating</p>
                <p className="text-xl font-bold text-ink">{partner.rating.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-ink-soft">Total Event</p>
                <p className="text-xl font-bold text-ink">{events.length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-ink">Kontak</h3>
            <p className="text-sm text-ink-soft">Website: {partner.websiteUrl}</p>
            <p className="text-sm text-ink-soft">Lokasi: {partner.location}</p>
          </div>
        </div>

        {/* Events */}
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-bold text-ink">Event oleh {partner.name}</h2>
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <p className="font-medium text-ink">{event.title}</p>
                    <p className="text-sm text-ink-soft">{event.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-ink">{formatIDR(event.price)}</p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/events/${event.slug}`}>Detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}