import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"

export function AdminAnalyticsPage() {
  const events = useEventsStore((s) => s.events)
  const totalFilled = events.reduce((sum, e) => sum + e.filled, 0)
  const totalQuota = events.reduce((sum, e) => sum + e.quota, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-soft">Total Event</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-ink">{events.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-soft">Total Peserta</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-ink">{totalFilled}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-ink-soft">Tingkat Pendaftaran</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-ink">{totalQuota > 0 ? Math.round((totalFilled / totalQuota) * 100) : 0}%</p></CardContent>
        </Card>
      </div>
    </div>
  )
}