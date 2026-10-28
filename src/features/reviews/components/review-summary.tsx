import { Star } from "lucide-react"

interface ReviewSummaryProps {
  averageRating: number
  totalReviews: number
  distribution: Record<number, number>
}

export function ReviewSummary({ averageRating, totalReviews, distribution }: ReviewSummaryProps) {
  const maxCount = Math.max(...Object.values(distribution), 1)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-ink">{averageRating.toFixed(1)}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={14}
                className={n <= Math.round(averageRating) ? "fill-ink text-ink" : "text-ink-soft"}
              />
            ))}
          </div>
          <p className="text-sm text-ink-soft mt-1">{totalReviews} ulasan</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-sm text-ink-soft w-4">{star}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink rounded-full"
                  style={{ width: `${(distribution[star] / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-ink-soft w-8 text-right">
                {distribution[star] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
