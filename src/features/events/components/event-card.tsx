import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import { formatIDR, formatDateShort } from "@/lib/format"

interface EventCardProps {
  id: string
  slug: string
  title: string
  category: string
  location: string
  startDate: string
  price: number
  capacity: number
  filled: number
  partnerName: string
  isVerified?: boolean
  rating?: number
  compact?: boolean
}

export function EventCard({
  slug,
  title,
  category,
  location,
  startDate,
  price,
  capacity,
  filled,
  partnerName,
  isVerified = false,
  rating = 0,
  compact = false,
}: EventCardProps) {
  const remaining = capacity - filled
  const isSoldOut = remaining <= 0

  return (
    <Card className="overflow-hidden transition-colors hover:bg-muted/50">
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-ink-soft text-sm">Cover</span>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{category}</Badge>
          {isVerified && (
            <span className="text-xs text-success font-medium">✓ Terverifikasi</span>
          )}
        </div>
        <h3 className={`font-bold text-ink ${compact ? "line-clamp-1" : "line-clamp-2"}`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{partnerName}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDateShort(startDate)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {location}
          </span>
        </div>
        {!compact && (
          <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {remaining} tersisa
            </span>
            {rating > 0 && (
              <span className="flex items-center gap-1">
                ★ {rating.toFixed(1)}
              </span>
            )}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-ink">
            {price === 0 ? "Gratis" : formatIDR(price)}
          </p>
          <Button
            size="sm"
            variant="secondary"
            asChild
            disabled={isSoldOut}
          >
            <Link to={`/events/${slug}`}>
              {isSoldOut ? "Penuh" : "Detail"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
