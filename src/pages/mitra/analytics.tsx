import { useEventsStore } from "@/store/events.store"
import { useOrdersStore } from "@/store/orders.store"
import { usePartnersStore } from "@/store/partners.store"
import { useAuthStore } from "@/store/auth.store"
import { calculateMitraAnalytics } from "@/features/mitra/lib/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/common/stat-card"
import { formatIDR } from "@/lib/format"

export default function MitraAnalytics() {
  const events = useEventsStore((s) => s.events)
  const bookings = useOrdersStore((s) => s.orders)
  const session = useAuthStore((s) => s.session)
  const getPartnerById = usePartnersStore((s) => s.getPartnerById)
  const partner = session ? getPartnerById(session.userId) : undefined

  const partnerEvents = partner
    ? events.filter((e) => e.partnerId === partner.id)
    : events
  const partnerBookings = partner
    ? bookings.filter((b) => partnerEvents.some((e) => e.id === b.eventId))
    : bookings

  const analytics = calculateMitraAnalytics(partnerEvents, partnerBookings)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">Dashboard Mitra</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pendaftar" value={analytics.totalRegistrants} />
        <StatCard label="Total Gross" value={formatIDR(analytics.totalGross)} />
        <StatCard label="Komisi" value={formatIDR(analytics.totalCommission)} />
        <StatCard label="Netto Mitra" value={formatIDR(analytics.totalNet)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Conversion Rate" value={`${analytics.conversionRate.toFixed(1)}%`} />
        <StatCard label="Event Terpopuler" value={analytics.topEvent || "-"} />
      </div>

      {analytics.monthlyTrend.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tren Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.monthlyTrend.map((m) => (
                <div key={m.month} className="flex justify-between text-sm">
                  <span className="text-ink-soft">{m.month}</span>
                  <span className="text-ink">{formatIDR(m.gross)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
