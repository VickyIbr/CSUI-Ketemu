import { useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { useOrdersStore } from "@/store/orders.store"
import { useReviewsStore } from "@/store/reviews.store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ReviewForm({ eventId }: { eventId: string }) {
  const session = useAuthStore((s) => s.session)
  const isAuthenticated = session !== null
  const orders = useOrdersStore((s) => s.orders)
  const reviews = useReviewsStore((s) => s.reviews)
  const addReview = useReviewsStore((s) => s.addReview)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const order = orders.find((o) => o.eventId === eventId && o.status === "paid")
  const alreadyReviewed = reviews.some((r) => r.eventId === eventId && r.userId === order?.userId)

  const canSubmit = isAuthenticated && order && !alreadyReviewed && rating > 0 && comment.length >= 20

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold text-success">✓</div>
          <h3 className="mt-4 text-lg font-bold text-ink">Ulasan berhasil dikirim!</h3>
          <p className="mt-1 text-sm text-ink-soft">Terima kasih atas masukan Anda.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tulis Ulasan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated ? (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            Login terlebih dahulu untuk menulis ulasan.
          </div>
        ) : !order ? (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            Anda belum membeli tiket ke event ini.
          </div>
        ) : alreadyReviewed ? (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
            Anda sudah menulis ulasan untuk event ini.
          </div>
        ) : null}

        {order && !alreadyReviewed && (
          <>
            <div className="space-y-2">
              <Label>Rating</Label>
              <RadioGroup
                defaultValue="0"
                className="flex gap-2"
                onValueChange={(v) => setRating(parseInt(v))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex items-center gap-1">
                    <RadioGroupItem value={String(n)} id={`star-${n}`} />
                    <Label htmlFor={`star-${n}`} className="cursor-pointer">
                      ★
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Komentar</Label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[100px]"
                placeholder="Jelaskan pengalaman Anda..."
                maxLength={500}
              />
              <p className="text-xs text-ink-soft">{comment.length}/500</p>
            </div>

            <Button
              onClick={() => {
                if (!canSubmit) return
                addReview({
                  id: `review-${Date.now()}`,
                  eventId,
                  userId: order.userId,
                  rating,
                  comment,
                  createdAt: new Date().toISOString(),
                })
                setSubmitted(true)
              }}
              disabled={!canSubmit}
            >
              Kirim Ulasan
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
