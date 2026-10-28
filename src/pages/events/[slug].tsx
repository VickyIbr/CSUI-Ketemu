import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"
import { useReviewsStore } from "@/store/reviews.store"
import { ReviewForm } from "@/features/reviews/components/review-form"
import { SEO } from "@/components/seo"
import { formatIDR, formatDateLong } from "@/lib/format"

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const getEventBySlug = useEventsStore((s) => s.getEventBySlug)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)
  const getReviewsByEvent = useReviewsStore((s) => s.getReviewsByEvent)
  const getAverageRating = useReviewsStore((s) => s.getAverageRating)

  const event = slug ? getEventBySlug(slug) : undefined
  const partner = event ? getPartnerById(event.partnerId) : undefined
  const reviews = event ? getReviewsByEvent(event.id) : []
  const avgRating = event ? getAverageRating(event.id) : 0

  if (!event) {
    return (
      <div className="container mx-auto max-w-[1160px] px-5 py-12 text-center">
        <h1 className="text-2xl font-bold text-ink">Event tidak ditemukan</h1>
        <Link to="/discover" className="mt-4 inline-block text-ink-blue underline">
          Kembali ke Discovery
        </Link>
      </div>
    )
  }

  const isSoldOut = event.filled >= event.quota

  return (
    <div className="container mx-auto max-w-[1160px] px-5 py-8">
      <SEO title={event.title} description={event.description} url={`/events/${event.slug}`} type="event" />
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={event.coverUrl}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{event.category}</Badge>
              {event.isFree && <Badge variant="success">Gratis</Badge>}
              {event.isOnline && <Badge variant="outline">Online</Badge>}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-ink">{event.title}</h1>
            <p className="mt-2 text-ink-soft">{event.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Tanggal Mulai</p>
                <p className="mt-1 font-medium text-ink">{formatDateLong(event.startDate)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Tanggal Selesai</p>
                <p className="mt-1 font-medium text-ink">{formatDateLong(event.endDate)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Lokasi</p>
                <p className="mt-1 font-medium text-ink">
                  {event.isOnline ? "Online" : event.location}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-ink-soft">Kapasitas</p>
                <p className="mt-1 font-medium text-ink">
                  {event.filled}/{event.quota} peserta
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Tujuan Pembelajaran</h2>
            <ul className="mt-3 space-y-2">
              {event.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-ink-soft">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-blue" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">Materi</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.syllabus.map((item, i) => (
                <Badge key={i} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {partner && (
            <div>
              <h2 className="text-xl font-bold text-ink">Diselenggarakan oleh</h2>
              <Card className="mt-3">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                  <div>
                    <p className="font-medium text-ink">{partner.name}</p>
                    <p className="text-sm text-ink-soft">{partner.tagline}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-ink">
              Ulasan ({reviews.length})
              {avgRating > 0 && (
                <span className="ml-2 text-lg font-normal text-ink-soft">
                  ★ {avgRating.toFixed(1)}
                </span>
              )}
            </h2>
            <div className="mt-4 space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                      <span className="text-xs text-ink-soft">
                        {new Date(review.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
              {reviews.length === 0 && (
                <p className="text-sm text-ink-soft">Belum ada ulasan</p>
              )}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-ink mb-3">Tulis Ulasan</h3>
              <ReviewForm eventId={event.id} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-ink">
                {event.isFree ? "Gratis" : formatIDR(event.price)}
              </div>
              <p className="mt-1 text-sm text-ink-soft">
                {isSoldOut ? "Sold out" : `${event.quota - event.filled} tiket tersisa`}
              </p>
              <Button
                className="mt-4 w-full"
                disabled={isSoldOut}
                asChild
              >
                <Link to={`/checkout/${event.id}`}>
                  {isSoldOut ? "Sold Out" : "Daftar Sekarang"}
                </Link>
              </Button>
              <div className="mt-4 space-y-2 text-sm text-ink-soft">
                <div className="flex justify-between">
                  <span>Kategori</span>
                  <span className="font-medium text-ink">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format</span>
                  <span className="font-medium text-ink">
                    {event.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}