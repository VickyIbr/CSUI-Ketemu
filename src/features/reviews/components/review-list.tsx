import { formatRelative } from "@/lib/format"

interface Review {
  id: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewListProps {
  reviews: Review[]
  userNames?: Record<string, string>
  limit?: number
}

export function ReviewList({ reviews, userNames = {}, limit = 5 }: ReviewListProps) {
  const displayed = limit ? reviews.slice(0, limit) : reviews

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-ink-soft">
        <p>Belum ada ulasan</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayed.map((review) => (
        <div key={review.id} className="border border-line rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-ink">
              {userNames[review.userId]?.slice(0, 2).toUpperCase() || "??"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink">
                  {userNames[review.userId] || "Pengguna"}
                </span>
                <span className="text-xs text-ink-soft">
                  {formatRelative(review.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={n <= review.rating ? "text-ink" : "text-ink-soft"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-ink">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
