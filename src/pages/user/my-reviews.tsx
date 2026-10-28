import { useReviewsStore } from "@/store/reviews.store"
import { useOrdersStore } from "@/store/orders.store"
import { useEventsStore } from "@/store/events.store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MyReviews() {
  const reviews = useReviewsStore((s) => s.reviews)
  const orders = useOrdersStore((s) => s.orders)
  const events = useEventsStore((s) => s.events)

  const reviewedEventIds = new Set(reviews.map((r) => r.eventId))
  const pendingReviews = orders
    .filter((o) => o.status === "paid" && !reviewedEventIds.has(o.eventId))
    .map((o) => events.find((e) => e.id === o.eventId))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Ulasan Saya</h1>

      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Menunggu Diulas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReviews.map((event) => event && (
              <div key={event.id} className="flex items-center justify-between border border-line rounded-lg p-3">
                <div>
                  <p className="font-medium text-ink">{event.title}</p>
                  <p className="text-sm text-ink-soft">{event.location}</p>
                </div>
                <Button size="sm" variant="secondary" asChild>
                  <a href={`/events/${event.slug}`}>Beri Ulasan</a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ulasan yang Dibuat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-sm text-ink-soft text-center py-4">
              Belum ada ulasan
            </p>
          ) : (
            reviews.map((review) => {
              const event = events.find((e) => e.id === review.eventId)
              return (
                <div key={review.id} className="border border-line rounded-lg p-3">
                  <p className="font-medium text-ink">
                    {event?.title || "Event"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={n <= review.rating ? "text-ink" : "text-ink-soft"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-ink-soft mt-1">{review.comment}</p>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
