import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  text: string
  date: string
  isVerified: boolean
}

interface ReviewListProps {
  reviews: Review[]
  limit?: number
}

export function ReviewList({ reviews, limit }: ReviewListProps) {
  const displayReviews = limit ? reviews.slice(0, limit) : reviews

  if (displayReviews.length === 0) {
    return <p className="text-center text-ink-soft">Belum ada ulasan.</p>
  }

  return (
    <div className="space-y-4">
      {displayReviews.map((review) => (
        <div key={review.id} className="rounded-lg border border-line bg-paper p-4">
          <div className="flex items-center gap-2">
            {review.userAvatar && (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-ink">{review.userName}</span>
                {review.isVerified && <Badge variant="success">Terverifikasi</Badge>}
              </div>
              <div className="flex items-center gap-1 text-ink-soft">
                <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className="text-xs">{(new Date(review.date)).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-ink-soft">{review.text}</p>
        </div>
      ))}
      {limit && reviews.length > limit && (
        <Link to="/reviews" className="block text-center text-sm text-ink-blue hover:underline">
          Lihat semua ulasan
        </Link>
      )}
    </div>
  )
}