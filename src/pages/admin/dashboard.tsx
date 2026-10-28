import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"
import { usePartnersStore } from "@/store/partners.store"

export function AdminDashboardPage() {
  const events = useEventsStore((s) => s.events)
  const partners = usePartnersStore((s) => s.partners)

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ink-soft">Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">{events.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ink-soft">Total Mitra</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">{partners.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ink-soft">Event Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">
              {events.filter((e) => e.status === "published").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-ink-soft">Total Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ink">
              {events.reduce((sum, e) => sum + e.filled, 0)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}