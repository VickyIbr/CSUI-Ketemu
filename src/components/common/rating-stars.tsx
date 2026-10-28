import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  size?: number
  showLabel?: boolean
}

export function RatingStars({ rating, size = 16, showLabel = true }: RatingStarsProps) {
  const fullStars = Math.round(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div>
      {showLabel && <span className="text-sm text-ink-soft">{rating.toFixed(1)}</span>}
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={size} className="fill-ink text-ink" />
        ))}
        {hasHalfStar && <Star size={size} className="fill-half text-ink text-ink-soft" />}
        {fullStars < 5 && [...Array(5 - fullStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="fill-transparent text-ink-soft" />
        ))}
      </div>
    </div>
  )
}
