import { Calendar, MapPin } from "lucide-react"

interface PortfolioItem {
  id: string
  eventTitle: string
  partnerName: string
  completedAt: string
  location: string
}

interface PortfolioSectionProps {
  items: PortfolioItem[]
}

export function PortfolioSection({ items }: PortfolioSectionProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-ink-soft">
        <p>Belum ada sertifikasi/event terverifikasi</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-ink mb-4">Sertifikasi & Event Terverifikasi</h3>
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-line rounded-lg p-4 hover:border-line-strong transition"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center text-success text-sm font-bold">
              ✓
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-ink">{item.eventTitle}</h4>
              <p className="text-sm text-ink-soft">{item.partnerName}</p>
              <div className="flex gap-4 mt-1 text-xs text-ink-soft">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {item.completedAt}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
