import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEventsStore } from "@/store/events.store"
import { Badge } from "@/components/ui/badge"

export function AdminEventsPage() {
  const events = useEventsStore((s) => s.events)
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-6">Event</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-ink-soft">Daftar Event ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.id} className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-ink">{e.title}</p>
                  <p className="text-sm text-ink-soft">{e.category} · {e.location}</p>
                </div>
                <Badge variant={e.status === "published" ? "default" : "secondary"}>{e.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}