import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface PartnerCardProps {
  id: string
  slug: string
  name: string
  tagline: string
  rating: number
  reviewCount: number
  eventCount: number
  isVerified?: boolean
}

export function PartnerCard({
  slug,
  name,
  tagline,
  rating,
  reviewCount,
  eventCount,
  isVerified = false,
}: PartnerCardProps) {
  return (
    <Card className="overflow-hidden transition-colors hover:bg-muted/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-ink-soft">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink">{name}</h3>
              {isVerified && (
                <span className="text-xs text-success font-medium">✓</span>
              )}
            </div>
            <p className="text-sm text-ink-soft">{tagline}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-ink text-ink" />
            {rating.toFixed(1)} ({reviewCount})
          </span>
          <span>{eventCount} event</span>
        </div>
        <Button size="sm" variant="secondary" className="mt-3 w-full" asChild>
          <Link to={`/mitra/${slug}`}>Lihat Profil</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
